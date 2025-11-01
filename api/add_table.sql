-- Table: public.user_settings

DROP TABLE IF EXISTS public.user_settings;

CREATE SEQUENCE user_settings_id_seq START WITH 1;


CREATE TABLE
IF NOT EXISTS public.user_settings
(
    id integer NOT NULL DEFAULT nextval
('user_settings_id_seq'::regclass),
    user_id integer UNIQUE,
    plant_id integer,
    CONSTRAINT user_settings_pkey PRIMARY KEY
(id),
    CONSTRAINT user_settings_plant_id_fkey FOREIGN KEY
(plant_id)
        REFERENCES public.plants
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE,
    CONSTRAINT user_settings_user_id_fkey FOREIGN KEY
(user_id)
        REFERENCES public.users
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE
IF EXISTS public.user_settings
    OWNER to admin;