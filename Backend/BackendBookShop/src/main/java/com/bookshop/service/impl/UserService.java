package com.bookshop.service.impl;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.bookshop.converter.UserConvert;
import com.bookshop.dto.*;
import com.bookshop.model.User;
import com.bookshop.repository.UserRepository;
import com.bookshop.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserDTO getUserInfo(User user) {
        return null;

    }

    @Override
    public void changeUserInfo(User user, ChangeInfoDTO userDTO) {
        return null;

    }

    @Override
    public ResponseMessage changeUserPassword(User user, ChangePassword changePassword) {
        return null;

    }

    @Override
    public ResponseMessage resetPassword(User user, ResetPassword resetPassword) {
        return null;
    }

    @Override
    public List<UserDTO> getAllAccount() {
        return null;

    }
}
