package br.com.desafiofullstack.services;

import br.com.desafiofullstack.domain.Animal;
import br.com.desafiofullstack.domain.Category;
import br.com.desafiofullstack.domain.Status;
import br.com.desafiofullstack.dto.AnimalDTO;
import br.com.desafiofullstack.repositories.AnimalRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class AnimalServiceTest {

    @InjectMocks
    private AnimalService animalService;

    @Mock
    private AnimalRepository animalRepository;

    @BeforeEach
    private void setup() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void AnimalService_CreateAnimal() {
        Animal animal = createAnimal();

        Mockito.when(animalRepository.save(Mockito.any(Animal.class))).thenReturn(animal);

        Animal savedAnimal = animalService.insert(animal);

        Assertions.assertThat(savedAnimal).isNotNull();
    }

    @Test
    public void AnimalService_FindById() {
        Animal animal = createAnimal();
        Integer animalId = animal.getId();

        Mockito.when(animalRepository.findById(animalId)).thenReturn(Optional.ofNullable(animal));

        Animal returnedAnimal = animalService.findById(animalId);

        Assertions.assertThat(returnedAnimal).isNotNull();
    }

    @Test
    public void AnimalService_UpdateStatus() {
        Animal animal = createAnimal();
        animal.setStatus(Status.ADOTADO);

        Integer animalId = animal.getId();

        Mockito.when(animalRepository.findById(animalId)).thenReturn(Optional.ofNullable(animal));
        Mockito.when(animalRepository.save(Mockito.any(Animal.class))).thenReturn(animal);

        Animal updateddAnimal = animalService.updateStatus(animal);

        Assertions.assertThat(updateddAnimal).isNotNull();
        Assertions.assertThat(updateddAnimal.getStatus()).isEqualTo(Status.ADOTADO);
    }


    private Animal createAnimal(){
        Animal animal = new Animal();
        animal.setId(1);
        animal.setName("Oreo");
        animal.setCategory(Category.GATO);
        animal.setStatus(Status.DISPONIVEL);
        return animal;
    }

}
