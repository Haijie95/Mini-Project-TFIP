package com.haijie.server.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.haijie.server.models.OfferCard;
import com.haijie.server.models.User;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void AccountCreated(String recipient, String UniqueId) throws MessagingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("justdavegame@gmail.com");
        helper.setTo(recipient);
        helper.setSubject("Welcome to the community!");
        String htmlMsg = "<p><b>Thanks for joining the community!</b><br><b>Please enjoy your time with us!</b> " 
        + " <br><b>Your unique ID for password reset: </b> " + UniqueId + "<br><a href=\"mini-pokemon-mart-production.up.railway.app\">Click here to return</a></p>";
        message.setContent(htmlMsg, "text/html");
        mailSender.send(message);
    }
    
    public boolean forgetPassword(User user) throws MessagingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("justdavegame@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Password request!");
        String htmlMsg = "<p><b>Your Login details for Pokemon Trading Site</b><br><b>Email : " + user.getEmail()+"</b>" + " <br><b>Password : " + user.getPassword()+ "</b>" + "<br><a href=\"mini-pokemon-mart-production.up.railway.app\">Click here to return</a></p>";
        message.setContent(htmlMsg, "text/html");
        mailSender.send(message);
        return true;
    }

    public boolean sendOfferMail(OfferCard offerCard) throws MessagingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(offerCard.getOfferemail());
        helper.setTo(offerCard.getEmail());
        helper.setSubject("Offer for "+offerCard.getCardname());
        String htmlMsg = "<p><b>I am interested in getting your "+offerCard.getCardname()+" at $ "+offerCard.getOfferprice()+"</b><br><b>Please do consider the offer!</b> " 
        + " <br><b>Thank you and hope to hear from you soon!</b><br><b>You can find me ("+offerCard.getName()+") at "+offerCard.getOfferemail()+"</b><br><a href=\"mini-pokemon-mart-production.up.railway.app\">Click here to return</a></p>";
        message.setContent(htmlMsg, "text/html");
        mailSender.send(message);
        return true;
    }
}
