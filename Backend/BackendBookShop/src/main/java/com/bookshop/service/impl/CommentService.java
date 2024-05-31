package com.bookshop.service.impl;

import com.bookshop.converter.CommentConverter;
import com.bookshop.dto.CommentDTO;
import com.bookshop.model.Book;
import com.bookshop.model.Comment;
import com.bookshop.model.User;
import com.bookshop.repository.BookRepository;
import com.bookshop.repository.CommentRepository;
import com.bookshop.repository.UserRepository;
import com.bookshop.service.ICommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {
    private final BookRepository bookRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    @Override
    public void createComment(User user, CommentDTO commentDTO) {

    }

    @Override
    public List<CommentDTO> getAllCommentByBook(long bookID) {
        List<CommentDTO> result = new ArrayList<>();
        return result;
    }

    @Override
    public List<CommentDTO> getAllCommentByUser(User user) {
        List<CommentDTO> result = new ArrayList<>();
        for(Comment cmt : comments){
            result.add(CommentConverter.toModel(cmt));
        }
        return result;
    }
}
