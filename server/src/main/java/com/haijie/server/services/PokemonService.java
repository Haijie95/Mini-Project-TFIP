package com.haijie.server.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.haijie.server.models.Cards;
import com.haijie.server.models.Sets;

@Service
public class PokemonService {

    private static final String API_URL="https://api.pokemontcg.io/v2/";

    @Value("${pokemon.api.key}")
    private String POKEMON_API_KEY;

    public List<Sets> getAllSets() throws IOException{

        ResponseEntity<String> response=null;
        List<Sets> p = null;

        //create the uri string
        String PokemonUrl = UriComponentsBuilder
        .fromUriString(API_URL)
        .path("sets")
        .toUriString();

        RestTemplate template = new RestTemplate();

        // Set the API key in the headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", POKEMON_API_KEY);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        response = template.exchange(PokemonUrl,HttpMethod.GET,requestEntity,String.class);

        p=Sets.create(response.getBody());

        return p;
    }

    public List<Cards> getSetCards(String reqString) throws IOException{

        ResponseEntity<String> response=null;
        List<Cards> c = null;

        //create the uri string
        String PokemonUrl = UriComponentsBuilder
        .fromUriString(API_URL)
        .path("cards")
        
        .queryParam("q", reqString)
        //.queryParam("set.series", series)
        .toUriString();

        RestTemplate template = new RestTemplate();

        // Set the API key in the headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", POKEMON_API_KEY);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        response = template.exchange(PokemonUrl,HttpMethod.GET,requestEntity,String.class);

        c=Cards.create(response.getBody());

        return c;
    }
    
}
