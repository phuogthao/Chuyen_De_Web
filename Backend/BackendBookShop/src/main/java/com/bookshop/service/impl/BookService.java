package com.bookshop.service.impl;

import com.bookshop.converter.BookConverter;
import com.bookshop.dto.BookDTO;
import com.bookshop.dto.PagingDTO;
import com.bookshop.model.Book;
import com.bookshop.model.CategoryBook;
import com.bookshop.model.User;
import com.bookshop.repository.BookRepository;
import com.bookshop.repository.CategoryRepository;
import com.bookshop.service.IBookService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookService implements IBookService {
    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;

    @Override
    public BookDTO saveBook(BookDTO bookDTO, User user) {
    return null;
    }

    @Override
    public BookDTO update(BookDTO bookDTO, User user,long id) {
     return null;
    }

    @Override
    public void deleteBooks(long[] ids) {
    }

    @Override
    public void deleteBook(long id) {

    }

    @Override
    public PagingDTO<BookDTO> getAllBook(String keyword, String category, int page, int size, String sortType, String sortBy, String mostRecent) {
    return null;
    }

    @Override
    public BookDTO getBookById(long id) {
        return null;

    }

    @Override
    public List<BookDTO> getTopSoldBooks() {
        return null;

    }

    @Override
    public List<BookDTO> getNewBooks() {
        return null;
    }
    }
