package br.com.desafiofullstack.resources;

import br.com.desafiofullstack.domain.Animal;
import br.com.desafiofullstack.dto.AnimalDTO;
import br.com.desafiofullstack.services.AnimalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/animals")
public class AnimalResource {

    @Autowired
    private AnimalService animalService;

    @Operation(summary = "Listar", description = "Metodo que retorna todos os animais cadastrados.", tags = "animais")
    @RequestMapping(method=RequestMethod.GET)
    public ResponseEntity<List<AnimalDTO>> findAll() {
        List<Animal> list = animalService.findAll();
        List<AnimalDTO> listDto = list.stream().map(obj -> new AnimalDTO(obj)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }

    @Operation(summary = "Buscar por ID", description = "Metodo que busca um animal por ID.", tags = "animais")
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public ResponseEntity<Animal> find(@PathVariable Integer id){
        Animal obj = animalService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @Operation(summary = "Cadastrar", description = "Metodo que cadastra um animal no banco de dados.", tags = "animais")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Retorna a url do novo recurso criado."),
            @ApiResponse(responseCode = "500", description = "Foi gerada uma exceção"),
    })
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> insert(@Valid @RequestBody AnimalDTO objDto){
        Animal obj = animalService.fromDTO(objDto);
        obj = animalService.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @Operation(summary = "Atualizar Status",
            description = "Metodo que atualiza o status de um animal. Por exemplo, o animal pode sair do status DISPONIVEL para ADOTADO.",
            tags = "animais")
    @RequestMapping(value = "/status/{id}",method = RequestMethod.PUT)
    public ResponseEntity<Void> updateStatus(@Valid @RequestBody AnimalDTO objDto, @PathVariable Integer id){
        Animal obj = animalService.fromDTO(objDto);
        obj.setId(id);
        obj = animalService.updateStatus(obj);
        return ResponseEntity.noContent().build();
    }

    /**

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        animalService.delete(id);
        return ResponseEntity.noContent().build();
    }*/

}
