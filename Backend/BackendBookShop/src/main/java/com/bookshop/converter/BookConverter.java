package com.bookshop.converter;

import com.bookshop.dto.BookDTO;
import com.bookshop.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookConverter {
    public static BookDTO toModel(Book bookEntity){
        return null;

    }
    public static Book toEntity(BookDTO bookModel){
        return null;

    }
    public Book toEntity(BookDTO bookModel,Book entity){
        return null;

    }
    public static List<BookDTO> toListBook(List<Book> models) {
        return null;

    }

    public static Page<BookDTO> getPageProducts(Page<Book> products) {
        return null;

    }
}
