package com.bookshop.service.impl;

import com.bookshop.converter.BookConverter;
import com.bookshop.converter.CategoryBookConverter;
import com.bookshop.dto.BookDTO;
import com.bookshop.dto.CategoryDTO;
import com.bookshop.dto.PagingDTO;
import com.bookshop.model.Book;
import com.bookshop.model.CategoryBook;
import com.bookshop.repository.BookRepository;
import com.bookshop.repository.CategoryRepository;
import com.bookshop.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;

    @Override
    public CategoryDTO saveCategoryBook(CategoryDTO categoryBookModel) {
        return null;

    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryBookModel) {
        return null;

    }

    @Override
    public List<CategoryDTO> getAllCategory() {
        return null;

    }

    @Override
    public void deleteCategories(long[] ids) {
        return null;

    }

    @Override
    public List<BookDTO> getListBookByCategory(long id) {
        return null;

    }

    @Override
    public PagingDTO<BookDTO> getBookByCategory(long id, String search, int page, int pageSize, String sortType, String sortBy, String mostRecent) {
        return null;

    }

}
