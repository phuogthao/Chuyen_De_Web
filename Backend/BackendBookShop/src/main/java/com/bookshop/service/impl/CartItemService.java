package com.bookshop.service.impl;


import com.bookshop.converter.CartConverter;
import com.bookshop.dto.CartItemDTO;
import com.bookshop.model.Book;
import com.bookshop.model.CartItem;
import com.bookshop.model.User;
import com.bookshop.repository.BookRepository;
import com.bookshop.repository.CartItemRepository;
import com.bookshop.service.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService {
    private final BookRepository bookRepository;
    private final CartItemRepository cartItemRepository;
    @Override
    public CartItemDTO saveCart(long id, int quantity , User user) {
        return null;

    }

    @Override
    public List<CartItemDTO> getAllCarts(User user) {
        return null;

    }

    @Override
    public void deleteCartItems(long[] ids) {
        return null;


    }

    @Override
    public void deleteCartItem(long id) {
        return null;

    }

    @Override
    public CartItemDTO updateCartItem(long id, CartItemDTO cartItemDTO,User user) {
        return null;

    }
}
