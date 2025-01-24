import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Detail } from '../types';
import BookDetail from '../BookDetail';

describe('BookDetail', () => {
  const mockDetail: Detail = {
    title: 'Sample Book Title',
    authors: [{ name: 'Author 1' }, { name: 'Author 2' }],
    imageUrl: 'someImage.jpg',
    tags: [{ name: 'Fiction' }, { name: 'Adventure' }],
    bookshelves: [{ name: 'Classics' }, { name: 'Popular' }],
    id: 0
  };

  it('renders the book title', () => {
    render(<BookDetail {...mockDetail} />);

    expect(screen.getByText(mockDetail.title)).toBeInTheDocument();
  });

  it('renders the book image when imageUrl is provided', () => {
    render(<BookDetail {...mockDetail} />);

    const image = screen.getByAltText('book-cover');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockDetail.imageUrl);
    expect(image).toHaveAttribute('alt', 'book-cover');
    expect(image).toHaveAttribute('height', '300px');
    expect(image).toHaveAttribute('width', '200px');
  });

  it('renders authors', () => {
    render(<BookDetail {...mockDetail} />);

    mockDetail.authors.forEach((author) => {
      expect(screen.getByText(author.name)).toBeInTheDocument();
    });
  });

  it('renders bookshelves when provided', () => {
    render(<BookDetail {...mockDetail} />);

    mockDetail.bookshelves?.forEach((shelf) => {
      expect(screen.getByText(shelf.name)).toBeInTheDocument();
    });
  });

  it('renders tags when provided', () => {
    render(<BookDetail {...mockDetail} />);

    mockDetail.tags?.forEach((tag) => {
      expect(screen.getByText(tag.name)).toBeInTheDocument();
    });
  });

  it('does not render the imageUrl section if missing', () => {
    const { imageUrl, ...partialDetail } = mockDetail;

    render(<BookDetail {...partialDetail} />);

    const image = screen.queryByText('book-cover');

    expect(imageUrl).not.toBe(image);
    expect(image).not.toBeInTheDocument();
  });

  it('does not render bookshelves section if missing', () => {
    const { bookshelves, ...partialDetail } = mockDetail;

    render(<BookDetail {...partialDetail} />);

    expect(screen.queryByText('Bookshelves')).not.toBeInTheDocument();

    bookshelves?.forEach((shelf) => {
      expect(screen.queryByText(shelf.name)).not.toBeInTheDocument();
    });
  });

  it('does not render tags section if missing', () => {
    const { tags, ...partialDetail } = mockDetail;

    render(<BookDetail {...partialDetail} />);

    expect(screen.queryByText('Tags')).not.toBeInTheDocument();

    tags?.forEach((tag) => {
      expect(screen.queryByText(tag.name)).not.toBeInTheDocument();
    });
  });
});
