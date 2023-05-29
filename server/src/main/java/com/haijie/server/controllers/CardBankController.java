package com.haijie.server.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.haijie.server.Email.EmailService;
import com.haijie.server.models.OfferCard;
import com.haijie.server.models.UserCard;
import com.haijie.server.services.CardBankService;

import jakarta.mail.MessagingException;

@RestController
@CrossOrigin("*")
public class CardBankController {
    
    @Autowired
    CardBankService cBSvc;

    @Autowired
    EmailService eSvc;

    @GetMapping(path="/api/market")
    public ResponseEntity<List<UserCard>> getAllCollections() throws IOException{

        List<UserCard> r = cBSvc.getAllC();
        System.out.println(r);

        if (r.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    @GetMapping(path="/api/personalcollection")
    public ResponseEntity<List<UserCard>> getSpecificSet(
    @RequestParam(required = true) String email) throws IOException{

        List<UserCard> result = cBSvc.getUserC(email);

        if (result.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping(path="/api/addcard", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> postOrder(@RequestBody UserCard userCard) {
        // System.out.println("card name"+userCard.getCardname());
        // System.out.println("card cond"+userCard.getCardcondition());
        // System.out.println("price"+userCard.getPrice());
        Boolean success = cBSvc.insertCollection(userCard);

        if (success.equals(false)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(success, HttpStatus.OK);
    }

    @PostMapping(path="/api/offercard", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> postOrder(@RequestBody OfferCard offerCard) throws MessagingException {
        
        
        Boolean success = eSvc.sendOfferMail(offerCard);

        if (success.equals(false)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(success, HttpStatus.OK);
    }

    @PostMapping(path="/api/removelisting", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> removeListing(@RequestBody Integer id) throws MessagingException {
        
        Boolean success = cBSvc.removeListing(id);

        if (success.equals(false)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(success, HttpStatus.OK);
    }
}
