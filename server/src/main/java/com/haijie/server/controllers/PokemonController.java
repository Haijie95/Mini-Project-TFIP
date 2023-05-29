package com.haijie.server.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.haijie.server.models.Cards;
import com.haijie.server.models.Sets;
import com.haijie.server.services.PokemonService;

@RestController
@CrossOrigin("**")
public class PokemonController {
    
    @Autowired
    private PokemonService pkmsvc;

    @GetMapping(path="/api/getAllSets")
    public ResponseEntity<List<Sets>> getAllSets() throws IOException{

        List<Sets> r = pkmsvc.getAllSets();

        if (r.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    @GetMapping(path="/api/getSetCards")
    public ResponseEntity<List<Cards>> getSpecificSet(
    @RequestParam(required = true) String setCode) throws IOException{

        String reqString;
        reqString=String.format("set.ptcgoCode:%s", setCode);
        //System.out.println(reqString);

        List<Cards> result = pkmsvc.getSetCards(reqString);

        if (result.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
