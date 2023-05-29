package com.haijie.server.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.haijie.server.models.User;
import com.haijie.server.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public String createuser(User user) {
        //generate UID
		String uniqueId = UUID.randomUUID().toString().substring(0, 8);
		//set the UID
        user.setUniqueId(uniqueId);
        userRepo.createUser(user);
        
		return uniqueId;
	}

    public List<User> findUserByEmail(String email){
        return userRepo.findUserByEmail(email).stream()
        .filter(v -> {
            try{
                User.createSummary(v);
                return true;
            } catch(Exception e){
                return false;}
            })
            .map(v -> User.createSummary(v))
                .toList();
        }
    
}
