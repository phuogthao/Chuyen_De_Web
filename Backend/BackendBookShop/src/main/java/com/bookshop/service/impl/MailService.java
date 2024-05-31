package com.bookshop.service.impl;

import com.bookshop.dto.OrderMail;
import com.bookshop.model.MailSettings;
import com.bookshop.service.IMailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

@Component
@RequiredArgsConstructor
public class MailService implements IMailService {
    private final MailSettings mailSettings;
    private final JavaMailSender javaMailSender;
    @Override
    public void sendMailOrderInfo(OrderMail orderMail) throws MessagingException, UnsupportedEncodingException {
        return null;

    }
    public void sendMailCodeVerify(String email, String code) throws MessagingException {
        return null;

    }
}
