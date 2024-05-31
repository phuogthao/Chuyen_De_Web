package com.bookshop.service.impl;

import com.bookshop.converter.OrderConverter;
import com.bookshop.converter.OrderItemConverter;
import com.bookshop.dto.OrderDTO;
import com.bookshop.dto.OrderMail;
import com.bookshop.model.*;
import com.bookshop.repository.BookRepository;
import com.bookshop.repository.CartItemRepository;
import com.bookshop.repository.OrderRepository;
import com.bookshop.service.IOrderService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;
    private final MailService mailService;
    private final BookRepository bookRepository;
    @Override
    public OrderDTO createOrderBook(OrderDTO orderDTO, User user) throws MessagingException, UnsupportedEncodingException {
        return null;

    }

    @Override
    public List<OrderDTO> getAllOrders(User user) {
        return null;

    }
}
