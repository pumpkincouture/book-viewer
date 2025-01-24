import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Author, BookShelf, Tag } from '../types';
import InfoContainer from '../InfoContainer';
import { ThemeProvider } from 'styled-components';

describe('InfoContainer', () => {

  const theme = {};

  const renderWithTheme = (title: string, infoItems: Author[] | Tag[] | BookShelf[]) => {
    return render(
      <ThemeProvider theme={theme}>
        <InfoContainer title={title} infoItems={infoItems} />
      </ThemeProvider>
    )
  };

  it('renders the title correctly', () => {
    const title = 'Test Title';
    const infoItems: Author[] = [];

    renderWithTheme(title, infoItems)

    const titleElement = screen.getByText(title);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe(title);
  });

  it('renders the correct number of items', () => {
    const title = 'Authors';
    const infoItems: Author[] = [
      { name: 'Person 1' },
      { name: 'Person 2' },
      { name: 'Person 3' },
    ];

    renderWithTheme(title, infoItems)

    const renderedItems = screen.getAllByText(/Person/);
    expect(renderedItems.length).toBe(infoItems.length);
  });

  it('does not render pill section if infoItems is empty', () => {
    const title = 'Tags';
    const infoItems: Tag[] = [];

    renderWithTheme(title, infoItems)

    expect(screen.queryByTestId('info-item-0')).not.toBeInTheDocument();

    const titleElement = screen.getByText(title);

    expect(titleElement.textContent).toBe(title);
  });

  it('handles different item types (Authors, BookShelves, Tags)', () => {
    const title = 'Mixed Items';
    const infoItems: (Author | BookShelf | Tag)[] = [
      { name: 'Author' },
      { name: 'Bookshelf' },
      { name: 'Tag' },
    ];

    renderWithTheme(title, infoItems)

    infoItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
