--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Homebrew)
-- Dumped by pg_dump version 14.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: animals; Type: TABLE; Schema: public; Owner: tpl622_3
--

CREATE TABLE public.animals (
    id integer NOT NULL,
    nickname text,
    species_id integer,
    r_c_timestamp date DEFAULT CURRENT_DATE
);


ALTER TABLE public.animals OWNER TO tpl622_3;

--
-- Name: individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_3
--

CREATE SEQUENCE public.individuals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.individuals_id_seq OWNER TO tpl622_3;

--
-- Name: individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl622_3
--

ALTER SEQUENCE public.individuals_id_seq OWNED BY public.animals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: tpl622_3
--

CREATE TABLE public.sightings (
    id integer NOT NULL,
    location text,
    animals_id integer,
    sighting_date date,
    r_c_timestamp date DEFAULT CURRENT_DATE
);


ALTER TABLE public.sightings OWNER TO tpl622_3;

--
-- Name: sighting_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_3
--

CREATE SEQUENCE public.sighting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sighting_id_seq OWNER TO tpl622_3;

--
-- Name: sighting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl622_3
--

ALTER SEQUENCE public.sighting_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: tpl622_3
--

CREATE TABLE public.species (
    id integer NOT NULL,
    name text,
    livingage integer,
    r_c_timestamp date DEFAULT CURRENT_DATE
);


ALTER TABLE public.species OWNER TO tpl622_3;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_3
--

CREATE SEQUENCE public.species_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.species_id_seq OWNER TO tpl622_3;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl622_3
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: animals id; Type: DEFAULT; Schema: public; Owner: tpl622_3
--

ALTER TABLE ONLY public.animals ALTER COLUMN id SET DEFAULT nextval('public.individuals_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: tpl622_3
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sighting_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: tpl622_3
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: animals; Type: TABLE DATA; Schema: public; Owner: tpl622_3
--

COPY public.animals (id, nickname, species_id, r_c_timestamp) FROM stdin;
1	Roar	1	2023-03-21
2	Growl	2	2023-03-21
3	Meow	3	2023-03-22
5	Roar2	5	2023-03-22
4	Hissss	4	2023-03-22
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: tpl622_3
--

COPY public.sightings (id, location, animals_id, sighting_date, r_c_timestamp) FROM stdin;
1	Maine	1	2023-01-21	2023-03-21
2	Iowa	2	2023-01-25	2023-03-22
3	New Jersey	3	2023-02-07	2023-03-22
4	Chicago	4	2023-02-12	2023-03-22
5	Nevada	5	2023-02-25	2023-03-22
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: tpl622_3
--

COPY public.species (id, name, livingage, r_c_timestamp) FROM stdin;
1	Tiger	40	2023-03-21
2	Bear	35	2023-03-21
3	Cat	3	2023-03-22
4	Fox	12	2023-03-22
5	Bear	25	2023-03-22
\.


--
-- Name: individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_3
--

SELECT pg_catalog.setval('public.individuals_id_seq', 3, true);


--
-- Name: sighting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_3
--

SELECT pg_catalog.setval('public.sighting_id_seq', 2, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_3
--

SELECT pg_catalog.setval('public.species_id_seq', 2, true);


--
-- Name: animals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_3
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sighting_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_3
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sighting_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_3
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: animals individuals_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_3
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT individuals_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id);


--
-- Name: sightings sighting_individuals_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_3
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sighting_individuals_id_fkey FOREIGN KEY (animals_id) REFERENCES public.animals(id);


--
-- PostgreSQL database dump complete
--

