/**
 * Books Screen
 * 
 * Main screen displaying the list of books from the inventory.
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ApiService from '../services/api';

interface Book {
  id: number;
  title: string;
  author?: string;
  isbn?: string;
  shelf_location?: string;
  section?: string;
  quantity?: number;
}

const BooksScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      const data = await ApiService.getBooks();
      setBooks(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch books. Make sure the backend is running.');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBooks();
  };

  const renderBook = ({item}: {item: Book}) => (
    <TouchableOpacity style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        {item.quantity && (
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>
        )}
      </View>
      
      {item.author && (
        <Text style={styles.bookAuthor}>by {item.author}</Text>
      )}
      
      {item.isbn && (
        <Text style={styles.bookDetail}>ISBN: {item.isbn}</Text>
      )}
      
      {(item.shelf_location || item.section) && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            📍 {item.shelf_location || 'N/A'}
            {item.section && `-${item.section}`}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading books...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Book Exchange Hub</Text>
        <Text style={styles.headerSubtitle}>
          {books.length} {books.length === 1 ? 'book' : 'books'} in inventory
        </Text>
      </View>
      
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No books found</Text>
            <Text style={styles.emptySubtext}>
              Pull down to refresh or add books from the backend
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 15,
  },
  bookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  bookDetail: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  locationContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  locationText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  quantityBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 30,
    alignItems: 'center',
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default BooksScreen;
