package br.com.desafiofullstack.services;

import br.com.desafiofullstack.domain.Animal;
import br.com.desafiofullstack.dto.AnimalDTO;
import br.com.desafiofullstack.repositories.AnimalRepository;
import br.com.desafiofullstack.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    public Animal findById(Integer id){
        Optional<Animal> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "Object not found! Id: " + id + ", Type: " + Animal.class.getName()));
    }

    public Animal insert(Animal obj) {
        obj.setId(null);
        obj = repository.save(obj);
        return obj;
    }

    public Animal updateStatus(Animal obj) {
        Animal newObj = findById(obj.getId());
        updateObjectStatus(newObj, obj);
        return repository.save(newObj);
    }

    public void delete(Integer id) {
        findById(id);
        try {
            repository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Não é possível excluir porque há entidades relacionadas");
        }
    }

    public List<Animal> findAll() {
        return repository.findByOrderByNameAsc();
    }

    private void updateObjectStatus(Animal newObj, Animal obj) {
        newObj.setStatus(obj.getStatus());
    }

    /**
    private void updateData(Animal newObj, Animal obj) {
        newObj.setName(obj.getName());
        newObj.setDescription(obj.getDescription());
        newObj.setImageUrl(obj.getImageUrl());
        newObj.setBirthDate(obj.getBirthDate());
        newObj.setCategory(obj.getCategory());
        newObj.setStatus(obj.getStatus());
    }*/

    private LocalDate stringToLocaleData(String stringDate){
        if(stringDate == null || stringDate.trim().equals("") ){
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate localDate = LocalDate.parse(stringDate, formatter);
        return localDate;
    }

    public Animal fromDTO(AnimalDTO objDto) {
        return new Animal(objDto.getId(), objDto.getName(),objDto.getDescription(),objDto.getImageUrl(), stringToLocaleData(objDto.getBirthDate()), objDto.getCategory(),objDto.getStatus());
    }

}
