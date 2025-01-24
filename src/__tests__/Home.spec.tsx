import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from '../Home';
import { ApiClient, ListResponse } from '../types';
import { ThemeProvider } from 'styled-components';

describe('Home', () => {
  const mockService: ApiClient = {
    getAll: jest.fn(),
    get: jest.fn(),
  };

  const formats = {
    'text/html': 'thing',
    'application/epub+zip': 'thing',
    'application/x-mobipocket-ebook': 'thing',
    'application/rdf+xml': 'thing',
    'image/jpeg': 'thing',
    'text/plain; charset=us-ascii': 'thing',
    'application/octet-stream': 'thing'
  }

  const mockBookResponse: ListResponse = {
    results: [
      {
        id: 1, title: 'Book One',
        subjects: [],
        authors: [],
        translators: [],
        bookshelves: [],
        languages: [],
        copyright: null,
        media_type: '',
        summaries: [],
        download_count: 0,
        formats
      },
      {
        id: 2, title: 'Book Two',
        subjects: [],
        authors: [],
        translators: [],
        bookshelves: [],
        languages: [],
        copyright: null,
        media_type: '',
        summaries: [],
        download_count: 0,
        formats
      },
    ],
    count: 0
  };

  const theme = {};

  const renderWithTheme = () => {
    return render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Home service={mockService} />
        </MemoryRouter>
      </ThemeProvider>
    )
  };

  test('renders loading state initially', () => {
    (mockService.getAll as jest.Mock).mockReturnValue(new Promise(() => {}));

    renderWithTheme()

    expect(screen.getByText(/loading books.../i)).toBeInTheDocument();
  });

  test('renders error state on API failure', async () => {
    (mockService.getAll as jest.Mock).mockRejectedValue(new Error('API Error'));

    renderWithTheme()

    await waitFor(() => expect(screen.getByText(/error loading books/i)).toBeInTheDocument());
  });

  test('renders list of books on successful API call', async () => {
    (mockService.getAll as jest.Mock).mockResolvedValue(mockBookResponse);

    renderWithTheme()

    await waitFor(() => {
      expect(screen.getByText(/top books/i)).toBeInTheDocument();
      expect(screen.getByText(/book one/i)).toBeInTheDocument();
      expect(screen.getByText(/book two/i)).toBeInTheDocument();
    });
  });

  test('links navigate to correct book details', async () => {
    (mockService.getAll as jest.Mock).mockResolvedValue(mockBookResponse);

    renderWithTheme()

    await waitFor(() => {
      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAttribute('href', '/book/1');
      expect(links[1]).toHaveAttribute('href', '/book/2');
    });
  });
});
