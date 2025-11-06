

-- Table: public.user_settings

-- DROP TABLE IF EXISTS public.user_settings;

CREATE TABLE
IF NOT EXISTS public.user_settings
(
    id integer NOT NULL DEFAULT nextval
('user_settings_id_seq'::regclass),
    user_id integer,
    plant_id integer,
    CONSTRAINT user_settings_pkey PRIMARY KEY
(id),
    CONSTRAINT user_settings_user_id_key UNIQUE
(user_id),
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

-- Table: public.record_counters

-- DROP TABLE IF EXISTS public.record_counters;

CREATE TABLE
IF NOT EXISTS public.record_counters
(
    id integer NOT NULL DEFAULT nextval
('record_counters_id_seq'::regclass),
    record_id integer,
    task_uid character varying
(255) COLLATE pg_catalog."default",
    counter_value integer NOT NULL,
    "createdAt" timestamp
with time zone NOT NULL,
    "updatedAt" timestamp
with time zone NOT NULL,
    CONSTRAINT record_counters_pkey PRIMARY KEY
(id),
    CONSTRAINT record_counters_task_uid_key UNIQUE
(task_uid),
    CONSTRAINT record_counters_record_id_fkey FOREIGN KEY
(record_id)
        REFERENCES public.records
(id) MATCH SIMPLE
        ON
UPDATE CASCADE
        ON
DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE
IF EXISTS public.record_counters
    OWNER to admin;