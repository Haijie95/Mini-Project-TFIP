package com.haijie.server.controllers;

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
import com.haijie.server.models.EmailReq;
import com.haijie.server.models.User;
import com.haijie.server.services.UserService;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.mail.MessagingException;

@RestController
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserService userSvc;

    @Autowired
    private EmailService eSvc;

    //private Logger logger = Logger.getLogger(UserController.class.getName());

    // @PostMapping(path="/api/createUser",consumes=MediaType.APPLICATION_JSON_VALUE)
	// public ResponseEntity<String> postOrder(@RequestBody User payload) {

	// 	logger.info("New User: %s".formatted(payload));

    //     //create a user from the payload
	// 	User user = User.toCreate(payload);

    //     //use service to get the UID
	// 	String uniqueId = userSvc.createuser(user);


	// 	JsonObject resp = Json.createObjectBuilder()
	// 		.add("uniqueId", uniqueId)
	// 		.build();

	// 	return ResponseEntity.ok(resp.toString());
	// }

    @PostMapping(path="/api/createUser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JsonObject> postOrder(@RequestBody User user) throws MessagingException {
        String uniqueId = userSvc.createuser(user);
        eSvc.AccountCreated(user.getEmail(), uniqueId);

        JsonObject resp = Json.createObjectBuilder()
            .add("uniqueId", uniqueId)
            .build();
        
        System.out.println(user.getEmail()+"and "+uniqueId);
        //eSvc.AccountCreated(user.getEmail(), uniqueId);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/api/login/attempt")
    public ResponseEntity<User> getUserByEmail(@RequestParam(required = true) String email){
        List<User> user =  userSvc.findUserByEmail(email);
        if (user.isEmpty()){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.get(0), HttpStatus.OK);
    }

    @PostMapping(path="/api/rememberpassword", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> removeListing(@RequestBody EmailReq emailreq) throws MessagingException {
        System.out.println(emailreq.getEmail());
        
        List<User> user =  userSvc.findUserByEmail(emailreq.getEmail());
        System.out.println(user);
        Boolean success = eSvc.forgetPassword(user.get(0));

        if (success.equals(false)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(success, HttpStatus.OK);
    }

    


}
