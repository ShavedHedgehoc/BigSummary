-- Table: public.record_counters

-- DROP TABLE IF EXISTS public.record_counters;

CREATE Sequence 'record_counters_id_seq'


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