/**
 * API Service
 * 
 * This service handles all API calls to the backend.
 * Includes error handling, timeout management, and response parsing.
 */

import config from '../config/api';

interface Book {
  id?: number;
  isbn?: string;
  title: string;
  author?: string;
  publisher?: string;
  description?: string;
  cover_url?: string;
  shelf_location?: string;
  section?: string;
  quantity?: number;
  available_quantity?: number;
}

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = config.apiBaseUrl;
    this.timeout = config.timeout;
  }

  /**
   * Generic fetch wrapper with timeout and error handling
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  /**
   * Get all books
   */
  async getBooks(): Promise<Book[]> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}${config.endpoints.books}`,
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Get a single book by ID
   */
  async getBookById(id: number): Promise<Book> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}${config.endpoints.bookById(id)}`,
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch book: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Create a new book
   */
  async createBook(book: Book): Promise<Book> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}${config.endpoints.books}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      },
    );
    
    if (!response.ok) {
      throw new Error(`Failed to create book: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Update an existing book
   */
  async updateBook(id: number, book: Partial<Book>): Promise<Book> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}${config.endpoints.bookById(id)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      },
    );
    
    if (!response.ok) {
      throw new Error(`Failed to update book: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Delete a book
   */
  async deleteBook(id: number): Promise<void> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}${config.endpoints.bookById(id)}`,
      {
        method: 'DELETE',
      },
    );
    
    if (!response.ok) {
      throw new Error(`Failed to delete book: ${response.statusText}`);
    }
  }

  /**
   * Check API health
   */
  async checkHealth(): Promise<{ status: string }> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}${config.endpoints.health}`,
    );
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    
    return response.json();
  }
}

export default new ApiService();
