package br.com.desafiofullstack.dto;

import br.com.desafiofullstack.domain.Animal;
import br.com.desafiofullstack.domain.Category;
import br.com.desafiofullstack.domain.Status;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class AnimalDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;

    @NotEmpty(message = "Preenchimento obrigatorio.")
    @Length(min = 4,max = 900,message = "O tamanho deve ficar entre 4 e 900 caracteres.")
    private String name;

    @Length(max = 200,message = "O tamanho maxido de 2000 caracteres.")
    private String description;

    @Length(max = 4000,message = "O tamanho maximo de 4000 caracteres.")
    private String imageUrl;

    private String birthDate;

    private int idade;

    @NotNull(message = "Preenchimento obrigatorio.")
    private Category category;

    @NotNull(message = "Preenchimento obrigatorio.")
    private Status status;

    public AnimalDTO() {
    }

    public AnimalDTO(Animal obj) {
        id = obj.getId();
        name = obj.getName();
        description = obj.getDescription();
        imageUrl = obj.getImageUrl();
        birthDate = localeDateToString(obj.getBirthDate());
        idade = obj.getAge();
        category = obj.getCategory();
        status = obj.getStatus();
    }

    private String localeDateToString(LocalDate localDate){
        String formatedString = "";
        if(localDate != null){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            formatedString =  localDate.format(formatter);
        }
        return formatedString;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }
}
