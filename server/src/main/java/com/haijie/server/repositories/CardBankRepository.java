package com.haijie.server.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.haijie.server.models.MarketCard;
import com.haijie.server.models.UserCard;
import static com.haijie.server.MySQL.SQLStatements.*;

@Repository
public class CardBankRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;
    
    public List<UserCard> getAllC(){
        return jdbcTemplate.query(selectAllSQL, BeanPropertyRowMapper
        .newInstance(UserCard.class));
    }

    public List<UserCard> getUserC(String email){
        return jdbcTemplate.query(findCollectionByEmail, BeanPropertyRowMapper
        .newInstance(UserCard.class),email);
    }

    public boolean insertCollection(UserCard userCard) {
        return jdbcTemplate.update(insertCollection,
            userCard.getDisplayname(),
            userCard.getEmail(),
            userCard.getCardname(),
            userCard.getType(),
            userCard.getCardcondition(),
            userCard.getDefect(),
            userCard.getPrice(),
            userCard.getAvailable(),
            userCard.getImage())>0;
    }

    public boolean removeListing(Integer id){
        return jdbcTemplate.update(removeListing, id)>0;
    }
}
