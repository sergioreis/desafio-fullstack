--data 19/07/2024
--author Sergio Reis
CREATE SEQUENCE IF NOT EXISTS public.seq_animal_id
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.animal (
  	id bigint DEFAULT nextval('seq_animal_id'::regclass),
	status   varchar(300),
	category varchar(300),
    birth_date timestamp without time zone,
    name character varying(900),
    description character varying(2000),
    image_url character varying(4000),

	CONSTRAINT animalPK PRIMARY KEY(id)
);