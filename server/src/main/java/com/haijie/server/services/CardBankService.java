package com.haijie.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.haijie.server.models.MarketCard;
import com.haijie.server.models.UserCard;
import com.haijie.server.repositories.CardBankRepository;

@Service
public class CardBankService {
    
    @Autowired
    CardBankRepository cBRepo;

    public List<UserCard> getAllC(){
        return cBRepo.getAllC();
    }

    public List<UserCard> getUserC(String email){
        return cBRepo.getUserC(email);
    }

    public boolean insertCollection(UserCard userCard){
        return cBRepo.insertCollection(userCard);
    }

    public boolean removeListing(Integer id){
        return cBRepo.removeListing(id);
    }
}
