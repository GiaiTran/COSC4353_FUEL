--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.25
-- Dumped by pg_dump version 9.5.25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: enum_profiles_outOfState; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_profiles_outOfState" AS ENUM (
    'yes',
    'no'
);


ALTER TYPE public."enum_profiles_outOfState" OWNER TO postgres;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: fuel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fuel (
    id integer NOT NULL,
    slug character varying(3) NOT NULL,
    date timestamp with time zone NOT NULL,
    profile character varying(3),
    gallon double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.fuel OWNER TO postgres;

--
-- Name: fuel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fuel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fuel_id_seq OWNER TO postgres;

--
-- Name: fuel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fuel_id_seq OWNED BY public.fuel.id;


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    slug character varying(3) NOT NULL,
    email character varying(255),
    fullname character varying(50) NOT NULL,
    address1 character varying(255) NOT NULL,
    address2 character varying(255),
    city character varying(255) NOT NULL,
    state character varying(255) NOT NULL,
    zipcode integer NOT NULL,
    "user" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(64) NOT NULL,
    "passwordConfirm" character varying(64) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuel ALTER COLUMN id SET DEFAULT nextval('public.fuel_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: fuel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fuel (id, slug, date, profile, gallon, "createdAt", "updatedAt") FROM stdin;
1	1	2021-04-07 18:00:00-06	1	19000	2021-03-31 13:25:07.586-06	2021-03-31 13:25:07.586-06
2	1	2021-04-07 18:00:00-06	1	60000	2021-03-31 13:25:15.142-06	2021-03-31 13:25:15.142-06
3	1	2021-04-01 18:00:00-06	1	90000	2021-03-31 13:28:54.001-06	2021-03-31 13:28:54.001-06
4	1	2021-04-02 18:00:00-06	1	90000000	2021-03-31 13:32:22.22-06	2021-03-31 13:32:22.22-06
5	1	2021-04-01 18:00:00-06	1	50000000	2021-03-31 13:35:06.764-06	2021-03-31 13:35:06.764-06
6	1	2021-04-01 18:00:00-06	1	50000000	2021-03-31 13:35:37.581-06	2021-03-31 13:35:37.581-06
7	1	2021-04-09 18:00:00-06	1	900000000	2021-03-31 13:37:07.318-06	2021-03-31 13:37:07.318-06
8	1	2021-04-01 18:00:00-06	1	50000000000	2021-03-31 13:49:40.788-06	2021-03-31 13:49:40.788-06
9	1	2021-04-12 18:00:00-06	1	123456	2021-04-02 00:24:49.049-06	2021-04-02 00:24:49.049-06
10	1	2021-04-12 18:00:00-06	1	11	2021-04-02 00:24:56.85-06	2021-04-02 00:24:56.85-06
11	1	2021-04-12 18:00:00-06	1	100	2021-04-02 00:25:20.091-06	2021-04-02 00:25:20.091-06
12	1	2021-04-20 18:00:00-06	1	99	2021-04-02 00:25:37.664-06	2021-04-02 00:25:37.664-06
13	1	2021-04-20 18:00:00-06	1	99	2021-04-02 00:28:51.189-06	2021-04-02 00:28:51.189-06
14	1	2021-04-13 18:00:00-06	1	99	2021-04-02 00:30:46.127-06	2021-04-02 00:30:46.127-06
15	1	2021-04-18 18:00:00-06	1	99	2021-04-02 00:31:05.002-06	2021-04-02 00:31:05.002-06
\.


--
-- Name: fuel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fuel_id_seq', 15, true);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (slug, email, fullname, address1, address2, city, state, zipcode, "user", "createdAt", "updatedAt") FROM stdin;
1	email@email.com	name	test update	\N	test update	TN	123456789	1	2021-03-31 13:24:12.682-06	2021-03-31 14:37:05.722-06
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, "passwordConfirm", "createdAt", "updatedAt") FROM stdin;
1	test	$2b$12$ljVzQpCfTDIkzA2L8cI.AOsqepAtTniDP9LgCYku1NxDvV9F63ZSK	$2b$12$u8UAvVXhSQC1595aDJ3SwuK808UTAdynS9/Ke9te7U9aVh3Id5zwe	2021-03-31 13:23:42.244-06	2021-03-31 13:23:42.244-06
2		$2b$12$3R44/nOHhCdMsTqJhoX00OGNYDnIzF5oYMDHrcARalv/f76a8QNqe	$2b$12$Tbdt3npZrgezTJWHlf2Dju1qX9h3AsUOK5XI4ElNGbc1KWzVIlP1S	2021-04-02 00:06:28.218-06	2021-04-02 00:06:28.218-06
3	test1	$2b$12$63nXkdCY7UZpglIgjo1HIO8Dvl4cXo5Fel6ge9NWIg.eqB2AP94He	$2b$12$HxvzK4THyy0cemiavkNvuOCNyjJUwK//0LrC0xxFc9DjcHZJCE3Sq	2021-04-02 00:35:41.332-06	2021-04-02 00:35:41.332-06
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: fuel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuel
    ADD CONSTRAINT fuel_pkey PRIMARY KEY (id);


--
-- Name: profiles_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_email_key UNIQUE (email);


--
-- Name: profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (slug);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: fuel_profile_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuel
    ADD CONSTRAINT fuel_profile_fkey FOREIGN KEY (profile) REFERENCES public.profiles(slug) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: profiles_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_fkey FOREIGN KEY ("user") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

