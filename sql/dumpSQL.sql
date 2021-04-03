# Converted with pg2mysql-1.9
# Converted on Fri, 02 Apr 2021 02:43:43 -0400
# Lightbox Technologies Inc. http://www.lightbox.ca

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone="+00:00";

CREATE TABLE public.fuel (
    id int(11) NOT NULL,
    slug varchar(3) NOT NULL,
    date timestamp NOT NULL,
    profile varchar(3),
    gallon double precision NOT NULL,
    `createdAt` timestamp NOT NULL,
    `updatedAt` timestamp NOT NULL
) TYPE=MyISAM;

CREATE TABLE public.profiles (
    slug varchar(3) NOT NULL,
    email varchar(255),
    fullname varchar(50) NOT NULL,
    address1 varchar(255) NOT NULL,
    address2 varchar(255),
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
    zipcode int(11) NOT NULL,
    `user` int(11),
    `createdAt` timestamp NOT NULL,
    `updatedAt` timestamp NOT NULL
) TYPE=MyISAM;

CREATE TABLE public.users (
    id int(11) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(64) NOT NULL,
    `passwordConfirm` varchar(64) NOT NULL,
    `createdAt` timestamp NOT NULL,
    `updatedAt` timestamp NOT NULL
) TYPE=MyISAM;

ALTER TABLE public.fuel
    ADD CONSTRAINT fuel_pkey PRIMARY KEY (id);
ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (slug);
ALTER TABLE public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
