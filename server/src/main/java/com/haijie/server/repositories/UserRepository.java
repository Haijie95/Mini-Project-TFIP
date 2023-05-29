package com.haijie.server.repositories;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.haijie.server.models.User;

import jakarta.json.JsonObject;

@Repository
public class UserRepository {
    
    @Autowired
	MongoTemplate template;

	public void createUser(User user) {

        //convert user to json object 
		JsonObject j = user.toJson();
		Document doc = Document.parse(j.toString());

        //insert into db
		template.insert(doc, "user");
	}

    public List<Document> findUserByEmail(String email) {
        //create criteria
        Criteria criteria = Criteria.where("email").is(email);

        //create a query
        Query query = Query.query(criteria);

        return template.find(query,Document.class,"user");
    }
}
