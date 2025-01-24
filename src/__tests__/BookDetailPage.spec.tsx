import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { ApiClient, BookResponse } from '../types';
import { ThemeProvider } from 'styled-components';
import BookDetailPage from '../BookDetailPage';

describe('BookDetailPage', () => {
  const mockService: ApiClient = {
    get: jest.fn(),
    getAll: jest.fn(),
  };

  const mockBookResponse: BookResponse = {
    id: 1,
    title: 'Mock Book',
    authors: [{
      name: 'Mock Author',
      birth_year: 1925,
      death_year: 2009
    }],
    formats: { 'application/epub+zip': 'some-format' },
    subjects: ['Mock Subject'],
    bookshelves: ['Mock Bookshelf'],
    translators: [],
    languages: [],
    copyright: null,
    media_type: '',
    summaries: [],
    download_count: 0
  };

  const mockBookResponseWithImage: BookResponse = {
    id: 1,
    title: 'Mock Book',
    authors: [{
      name: 'Mock Author',
      birth_year: 1925,
      death_year: 2009
    }],
    formats: { 'image/jpeg': 'some-format' },
    subjects: ['Mock Subject'],
    bookshelves: ['Mock Bookshelf'],
    translators: [],
    languages: [],
    copyright: null,
    media_type: '',
    summaries: [],
    download_count: 0
};

  const theme = {};

  const renderWithTheme = (url: string) => {
    return render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[url]}>
          <Routes>
            <Route path='/book/:id' element={<BookDetailPage service={mockService} />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    )
  };

  it('renders loading state initially', () => {
    (mockService.get as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves

    const url = '/book/1';
    renderWithTheme(url)

    expect(screen.getByText('Loading chosen book...')).toBeInTheDocument();
  });

  it('renders error state when the API call fails', async () => {
    (mockService.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    const url = '/book/1';
    renderWithTheme(url)

    await waitFor(() => {
      expect(screen.getByText('Error loading chosen book!')).toBeInTheDocument();
    });
  });

  it('renders the BookDetail component on successful fetch', async () => {
    (mockService.get as jest.Mock).mockResolvedValue(mockBookResponse);

    const url = '/book/1';
    renderWithTheme(url)

    await waitFor(() => {
      expect(screen.getByText('Mock Book')).toBeInTheDocument();

      const image = screen.queryByAltText('book-cover');

      expect(image).not.toBeInTheDocument();
    });
  });

  it('renders the BookDetail component on successful fetch and displays image', async () => {
    (mockService.get as jest.Mock).mockResolvedValue(mockBookResponseWithImage);

    const url = '/book/1';
    renderWithTheme(url)

    await waitFor(() => {
      expect(screen.getByText('Mock Book')).toBeInTheDocument();

      const image = screen.getByAltText('book-cover');

      expect(image).toBeInTheDocument();
    });
  });

  it('calls the API with the correct book ID', async () => {
    (mockService.get as jest.Mock).mockResolvedValue(mockBookResponse);

    const url = '/book/123';
    renderWithTheme(url)

    await waitFor(() => {
      expect(mockService.get).toHaveBeenCalledWith('/123');
    });
  });
});
