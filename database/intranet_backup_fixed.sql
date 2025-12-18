--
-- PostgreSQL database dump
--

\restrict LWfOfFdkabOOl6ifwgYCqJeCBxdGMmM6Rr8CBEhyCyCtOdVtARtMXeq0iFpFNLQ

-- Dumped from database version 15.15
-- Dumped by pg_dump version 15.15

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
-- Name: anuncios; Type: TABLE; Schema: public; Owner: user_intranet
--

CREATE TABLE public.anuncios (
    id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    imagen_url character varying(500) NOT NULL,
    link character varying(500),
    es_interno boolean DEFAULT false,
    contenido text,
    resumen character varying(500),
    orden integer DEFAULT 0,
    activo boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.anuncios OWNER TO user_intranet;

--
-- Name: anuncios_id_seq; Type: SEQUENCE; Schema: public; Owner: user_intranet
--

CREATE SEQUENCE public.anuncios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.anuncios_id_seq OWNER TO user_intranet;

--
-- Name: anuncios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user_intranet
--

ALTER SEQUENCE public.anuncios_id_seq OWNED BY public.anuncios.id;


--
-- Name: directorio; Type: TABLE; Schema: public; Owner: user_intranet
--

CREATE TABLE public.directorio (
    id integer NOT NULL,
    departamento character varying(255) NOT NULL,
    extension character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.directorio OWNER TO user_intranet;

--
-- Name: directorio_id_seq; Type: SEQUENCE; Schema: public; Owner: user_intranet
--

CREATE SEQUENCE public.directorio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directorio_id_seq OWNER TO user_intranet;

--
-- Name: directorio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user_intranet
--

ALTER SEQUENCE public.directorio_id_seq OWNED BY public.directorio.id;


--
-- Name: documentos; Type: TABLE; Schema: public; Owner: user_intranet
--

CREATE TABLE public.documentos (
    id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    categoria character varying(50) NOT NULL,
    tipo character varying(10) NOT NULL,
    fecha date DEFAULT CURRENT_DATE,
    url character varying(500),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.documentos OWNER TO user_intranet;

--
-- Name: documentos_id_seq; Type: SEQUENCE; Schema: public; Owner: user_intranet
--

CREATE SEQUENCE public.documentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.documentos_id_seq OWNER TO user_intranet;

--
-- Name: documentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user_intranet
--

ALTER SEQUENCE public.documentos_id_seq OWNED BY public.documentos.id;


--
-- Name: noticias; Type: TABLE; Schema: public; Owner: user_intranet
--

CREATE TABLE public.noticias (
    id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    contenido text NOT NULL,
    imagen_url character varying(500),
    fecha_publicacion date DEFAULT CURRENT_DATE,
    autor character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.noticias OWNER TO user_intranet;

--
-- Name: noticias_id_seq; Type: SEQUENCE; Schema: public; Owner: user_intranet
--

CREATE SEQUENCE public.noticias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.noticias_id_seq OWNER TO user_intranet;

--
-- Name: noticias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user_intranet
--

ALTER SEQUENCE public.noticias_id_seq OWNED BY public.noticias.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: user_intranet
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    nombre character varying(100) NOT NULL,
    rol character varying(20) DEFAULT 'user'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO user_intranet;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: user_intranet
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO user_intranet;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user_intranet
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: anuncios id; Type: DEFAULT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.anuncios ALTER COLUMN id SET DEFAULT nextval('public.anuncios_id_seq'::regclass);


--
-- Name: directorio id; Type: DEFAULT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.directorio ALTER COLUMN id SET DEFAULT nextval('public.directorio_id_seq'::regclass);


--
-- Name: documentos id; Type: DEFAULT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.documentos ALTER COLUMN id SET DEFAULT nextval('public.documentos_id_seq'::regclass);


--
-- Name: noticias id; Type: DEFAULT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.noticias ALTER COLUMN id SET DEFAULT nextval('public.noticias_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: anuncios; Type: TABLE DATA; Schema: public; Owner: user_intranet
--

COPY public.anuncios (id, titulo, imagen_url, link, es_interno, contenido, resumen, orden, activo, created_at) FROM stdin;
3	333	/uploads/sliders/imagenslider.jpg		f		.	1	t	2025-12-15 16:34:57.321107
4	prueba	/uploads/sliders/1765816584932.png		f		nada	2	t	2025-12-15 16:36:24.96333
5	prueba1212	/uploads/sliders/1765819699275.png		t	<div class="article-content">\r\n  <p class="lead">Escribe aquí la introducción del anuncio ...</p>\r\n\r\n  <div class="info-box">\r\n    <strong>Información Importante:</strong> Destacado del anuncio.\r\n  </div>\r\n\r\n  <h2>Detalles</h2>\r\n  <p>Contenido principal del anuncio. Puedes añadir párrafos, listas e imágenes.</p>\r\n  \r\n  <ul class="feature-list">\r\n    <li>Punto clave 1</li>\r\n    <li>Punto clave 2</li>\r\n  </ul>\r\n\r\n  <h3>Más Información</h3>\r\n  <p>Contacte al área responsable para más detalles.</p>\r\n</div>		0	t	2025-12-15 17:28:19.334568
6	prueba121212	/uploads/sliders/1765833157793.png		t	<div class="article-content">\r\n  <p class="lead">Escribe aquí la introducción del anuncio prueba121212</p>\r\n\r\n  <div class="info-box">\r\n    <strong>Información Importante:</strong> Destacado del anuncio.\r\n  </div>\r\n\r\n  <h2>Detalles</h2>\r\n  <p>Contenido principal del anuncio. Puedes añadir párrafos, listas e imágenes.</p>\r\n  \r\n  <ul class="feature-list">\r\n    <li>Punto clave 1</li>\r\n    <li>Punto clave 2</li>\r\n  </ul>\r\n\r\n  <h3>Más Información</h3>\r\n  <p>Contacte al área responsable para más detalles.</p>\r\n</div>	.	3	t	2025-12-15 21:12:37.915344
\.


--
-- Data for Name: directorio; Type: TABLE DATA; Schema: public; Owner: user_intranet
--

COPY public.directorio (id, departamento, extension, created_at) FROM stdin;
1	AGREMIACIÓN SACYL	027	2025-12-15 16:16:44.695734
2	EVENTOS ADVERSOS	333-038	2025-12-15 16:16:44.695734
3	NUTRICIONISTAS	036-632	2025-12-15 16:16:44.695734
4	ACREDITACIÓN	732	2025-12-15 16:16:44.695734
5	FACTURACIÓN AUTORIZACIONES	004-455	2025-12-15 16:16:44.695734
6	PARQUEADERO	630	2025-12-15 16:16:44.695734
7	ADMINISTRACIÓN DE RECURSOS	8932752	2025-12-15 16:16:44.695734
8	FACTURACIÓN AUXILIAR SOAT	110	2025-12-15 16:16:44.695734
9	PBX	8879200-8932750-8932640	2025-12-15 16:16:44.695734
10	ADMINISTRACIÓN DE RECURSOS (AUX)	520	2025-12-15 16:16:44.695734
11	FACTURACIÓN CARDIOLOGÍA NO INVASIVA	017	2025-12-15 16:16:44.695734
12	PENSION	200	2025-12-15 16:16:44.695734
13	ADMINISTRACION DE TIC'S-SISTEMAS	509	2025-12-15 16:16:44.695734
14	FACTURACIÓN CENTRAL	010-015-009	2025-12-15 16:16:44.695734
15	PLANEACION E INFORMACION	506	2025-12-15 16:16:44.695734
16	ALMACEN	623	2025-12-15 16:16:44.695734
17	FACTURACIÓN CENTRO CARDIOVASCULAR HEMODINAMIA	122	2025-12-15 16:16:44.695734
18	PLANEACIÓN E INFORMACIÓN	8932646	2025-12-15 16:16:44.695734
19	ALMACEN CENTRO CARDIOVASCULAR - HEMODINAMIA	124	2025-12-15 16:16:44.695734
20	FACTURACIÓN INTERMEDIOS B	127	2025-12-15 16:16:44.695734
21	PORTERIA	500	2025-12-15 16:16:44.695734
22	AMBULATORIOS	109	2025-12-15 16:16:44.695734
23	FACTURACIÓN PENSIÓN	212	2025-12-15 16:16:44.695734
24	PROCEDIMIENTOS DE ENFERMERIA	615-635	2025-12-15 16:16:44.695734
25	ARCHIVO PASIVO	020	2025-12-15 16:16:44.695734
26	FACTURACIÓN QUIROFANOS	218	2025-12-15 16:16:44.695734
27	PROGRAMACION DE CIRUGIAS - AMBULATORIOS	105	2025-12-15 16:16:44.695734
28	ASESOR DE CONTROL INTERNO	634	2025-12-15 16:16:44.695734
29	FACTURACIÓN RX-OFICINA	738	2025-12-15 16:16:44.695734
30	QUIR CENTRAL ESTERILIZACIÓN	226	2025-12-15 16:16:44.695734
31	ASESOR GARANTÍA CALIDAD	530	2025-12-15 16:16:44.695734
32	FACTURACIÓN SALA NORTE	317	2025-12-15 16:16:44.695734
33	QUIRÓFANOS	225	2025-12-15 16:16:44.695734
34	ASESORÍA JURIDICA	402-432	2025-12-15 16:16:44.695734
35	FACTURACIÓN SALA SUR	311	2025-12-15 16:16:44.695734
36	RADIOLOGIA CITAS	123	2025-12-15 16:16:44.695734
37	ASESORIA JURIDICA GERENCIA	531	2025-12-15 16:16:44.695734
38	FACTURACIÓN UCI MEDICA	301	2025-12-15 16:16:44.695734
39	RADIOLOGIA TECNICOS	126	2025-12-15 16:16:44.695734
40	ASIGNACIÓN DE CITAS	8932643	2025-12-15 16:16:44.695734
41	FACTURACIÓN URGENCIAS	407	2025-12-15 16:16:44.695734
42	RECEPCIÓN ADMINISTRATIVA	118-555-511	2025-12-15 16:16:44.695734
43	AUDITORÍA CONCURRENTE-CUENTAS MÉDICAS	037	2025-12-15 16:16:44.695734
44	FACTURACIÓN-GLOSAS Y DEVOLUCIONES	023	2025-12-15 16:16:44.695734
45	RECEPCIÓN CONSULTA EXTERNA	618	2025-12-15 16:16:44.695734
46	AUDITORIA MEDICA - ESTANCIAS-EGRESOS	024	2025-12-15 16:16:44.695734
47	FARMACIA	147	2025-12-15 16:16:44.695734
48	RECEPCION IMÁGENES DIAGNOSTICAS	008	2025-12-15 16:16:44.695734
49	AUTORIZACIONES-AMBULATORIOS	102	2025-12-15 16:16:44.695734
50	FARMACIA CENTRAL ADEC. MEDI	643	2025-12-15 16:16:44.695734
51	RECUPERACION	220	2025-12-15 16:16:44.695734
52	CAFETERIA	006	2025-12-15 16:16:44.695734
53	FARMACIA DISPENSACION	146	2025-12-15 16:16:44.695734
54	REFERENCIA Y CONTRA-REFERENCIA	400	2025-12-15 16:16:44.695734
55	CARTERA	503	2025-12-15 16:16:44.695734
56	FARMACIA FARMACOVIGILANCIA	149	2025-12-15 16:16:44.695734
57	REHABILITACIÓN CARDIACA	619	2025-12-15 16:16:44.695734
58	CENTRAL ADECUACIÓN DE MEDICAMENTOS	629	2025-12-15 16:16:44.695734
59	FARMACIA NO POS	148	2025-12-15 16:16:44.695734
60	RESONADOR	021	2025-12-15 16:16:44.695734
61	CENTRAL ESTERILIZACIÓN QUIROFANOS	223	2025-12-15 16:16:44.695734
62	FARMACIA-BODEGA	642-644	2025-12-15 16:16:44.695734
63	SALA NORTE	316	2025-12-15 16:16:44.695734
64	CENTRAL MATERIALES	216	2025-12-15 16:16:44.695734
65	FARMACIA-QUIROFANO	213	2025-12-15 16:16:44.695734
66	SALA NORTE MÉDICOS	328	2025-12-15 16:16:44.695734
67	CENTRO CARDIOVASCULAR-HEMODINAMIA FAX	112	2025-12-15 16:16:44.695734
68	FAX	8932641	2025-12-15 16:16:44.695734
69	SALA SUR	310	2025-12-15 16:16:44.695734
70	CITAS PARTICULARES-VIVIR MEJOR-PREPAGADA	752	2025-12-15 16:16:44.695734
71	FINANCIERA	507	2025-12-15 16:16:44.695734
72	SALA SUR MEDICOS	327-326	2025-12-15 16:16:44.695734
73	COCINA-ECOΝΟΜΑΤΟ	001	2025-12-15 16:16:44.695734
74	FINANCIERA (EXTERNA)	8932649	2025-12-15 16:16:44.695734
75	SERVICIO DE ALIMENTACIÓN-COCINA	000	2025-12-15 16:16:44.695734
76	COMUNICACIÓN Y MERCADEO	8932751	2025-12-15 16:16:44.695734
77	FINANCIERA (OFICINA)	736	2025-12-15 16:16:44.695734
78	COMUNICACIÓN Y MERCADEO-Oficina	753	2025-12-15 16:16:44.695734
79	FISIOTERAPIΑ	624	2025-12-15 16:16:44.695734
80	SIAU/TRABAJO SOCIAL	723-808	2025-12-15 16:16:44.695734
81	CONSOLA	100	2025-12-15 16:16:44.695734
82	GARANTIA CALIDAD/SEGURIDAD DEL PACIENTE	519-539	2025-12-15 16:16:44.695734
83	SIAU-ATENCIÓN AL USUARIO	8932642	2025-12-15 16:16:44.695734
84	CONSULTA EXTERNA	600	2025-12-15 16:16:44.695734
85	GERENCIA	523	2025-12-15 16:16:44.695734
86	SUBDIRECCIÓN CIENTÍFICA OFICINA	025	2025-12-15 16:16:44.695734
87	CONSULTA EXTERNA-PUESTO ENFERMERIA	626	2025-12-15 16:16:44.695734
88	GERENCIA SECRETARIA (EXTERNA)	8932648	2025-12-15 16:16:44.695734
89	SUBDIRECTOR CIENTIFICO	026	2025-12-15 16:16:44.695734
90	CONTABILIDAD	510	2025-12-15 16:16:44.695734
91	GERENCIA SECRETARIA	502	2025-12-15 16:16:44.695734
92	SUPERVISOR CENTRO CONTACTO	728	2025-12-15 16:16:44.695734
93	CONTROL INTERNO OFICINA	627	2025-12-15 16:16:44.695734
94	GESTIÓN DEL RIESGO	039	2025-12-15 16:16:44.695734
95	TALENTO HUMANO	501-505	2025-12-15 16:16:44.695734
96	COORDINACIÓN APOYO LOGISTICO	012	2025-12-15 16:16:44.695734
97	GESTIÓN DOCUMENTAL ADMINISTRATIVA	115	2025-12-15 16:16:44.695734
98	TALENTO HUMANO (EXTERNA)	8932647	2025-12-15 16:16:44.695734
99	COORDINACIÓN CARDIOLOGÍA NO INVASIVA	018	2025-12-15 16:16:44.695734
100	GESTION DOCUMENTAL CLINICA (ESTADISTICA)	620-622	2025-12-15 16:16:44.695734
101	TALENTO HUMANO PSICOLOGA	526	2025-12-15 16:16:44.695734
102	COORDINACIÓN CENTRO CARDIOVASCULAR - HEMODINAMIA	111	2025-12-15 16:16:44.695734
103	IMAGENES ECOGRAFIA	132-130	2025-12-15 16:16:44.695734
104	TALLER DE SISTEMAS	413-032	2025-12-15 16:16:44.695734
105	COORDINACION CENTRO DE CONTACTO	739	2025-12-15 16:16:44.695734
106	IMAGENES ENDOSCOPIA	120	2025-12-15 16:16:44.695734
107	TALLER ELECTRICOS	022	2025-12-15 16:16:44.695734
108	COORDINACIÓN CONSULTA EXTERNA	628	2025-12-15 16:16:44.695734
109	INVENTARIOS	114-758	2025-12-15 16:16:44.695734
110	TALLER MANTENIMIENTO BIOMEDICO	113	2025-12-15 16:16:44.695734
111	COORDINACIÓN DE AUDITORIA MÉDICA	035	2025-12-15 16:16:44.695734
112	INVESTIGACIÓN Y ENTRENAMIENTO	756	2025-12-15 16:16:44.695734
113	TARJETA VIVIR MEJOR	8932645	2025-12-15 16:16:44.695734
114	COORDINACIÓN DE ENFERMERIA	016	2025-12-15 16:16:44.695734
115	JEFATURA ADMINISTRACIÓN DE RECURSOS	512	2025-12-15 16:16:44.695734
116	TERAPIA OCUPACIONAL Y FONOAUDIOLOGIA	735	2025-12-15 16:16:44.695734
117	COORDINACIÓN DE PLANEACIÓN E INFORMACIÓN	517	2025-12-15 16:16:44.695734
118	JEFATURA ALMACEN	633	2025-12-15 16:16:44.695734
119	TESORERIA	504	2025-12-15 16:16:44.695734
120	COORDINACION DE URGENCIAS	408	2025-12-15 16:16:44.695734
121	JEFATURA COMUNICACIÓN Y MERCADEO	750	2025-12-15 16:16:44.695734
122	TESORERIA (EXTERNA)	8932753	2025-12-15 16:16:44.695734
123	COORDINACIÓN FACTURACION	1007	2025-12-15 16:16:44.695734
124	JEFATURA FINANCIERA	550	2025-12-15 16:16:44.695734
125	TOMOGRAFO	131	2025-12-15 16:16:44.695734
126	COORDINACIÓN HIGIENE Y MANTENIMIENTO	044	2025-12-15 16:16:44.695734
127	JEFE ENFERMERÍA PENSIÓN	129	2025-12-15 16:16:44.695734
128	TUTELAS	034	2025-12-15 16:16:44.695734
129	JUDICANTE	404	2025-12-15 16:16:44.695734
130	U.C.I. MÉDICA	300-302	2025-12-15 16:16:44.695734
131	COORDINACION IMAGENES DIAGNOSTICAS	822	2025-12-15 16:16:44.695734
132	LABORATORIO CLINICO-FAX	424	2025-12-15 16:16:44.695734
133	U.C.I. OFICINA	221	2025-12-15 16:16:44.695734
134	COORDINACIÓN IMÁGENOLOGÍA	121	2025-12-15 16:16:44.695734
135	LABORATORIO CLINICO-GENERALES	423	2025-12-15 16:16:44.695734
136	U.C.I. QUIRÚRGICA	222	2025-12-15 16:16:44.695734
137	COORDINACION INGENIERÍA BIOMEDICA	144	2025-12-15 16:16:44.695734
138	LABORATORIO CLÍNICO-MICROBIOLOGÍA	425	2025-12-15 16:16:44.695734
139	UNIDAD DE CUIDADOS INTERMEDIOS A	140-141	2025-12-15 16:16:44.695734
140	COORDINACIÓN INVESTIGACIÓN Y ENTRENAMIENTO	757	2025-12-15 16:16:44.695734
141	LABORATORIO CLÍNICO-QUIMICAS	426	2025-12-15 16:16:44.695734
142	UNIDAD DE CUIDADOS INTERMEDIOS B	127	2025-12-15 16:16:44.695734
143	COORDINACIÓN LABORATORIO CLINICO	428	2025-12-15 16:16:44.695734
144	LABORATORIO CLINICO-RECEPCIÓN	422	2025-12-15 16:16:44.695734
145	URGENCIAS	403-002	2025-12-15 16:16:44.695734
146	COORDINACIÓN MENSAJERÍA	003	2025-12-15 16:16:44.695734
147	LABORATORIO DE EPILEPSIA	145	2025-12-15 16:16:44.695734
148	URGENCIAS (LINEA 2)	8932644	2025-12-15 16:16:44.695734
149	COORDINACIÓN SERVICIO FARMACEUTICO	641	2025-12-15 16:16:44.695734
150	LABORATORIO DE HEMATOLOGÍA	427	2025-12-15 16:16:44.695734
151	URGENCIAS CONSULTORIO 1	401	2025-12-15 16:16:44.695734
152	COSTOS-PROYECCION OPERACIONAL	515	2025-12-15 16:16:44.695734
153	LABORATORIO PATOLOGIA	421	2025-12-15 16:16:44.695734
154	URGENCIAS FAX	406	2025-12-15 16:16:44.695734
155	CARPA COVID	514	2025-12-15 16:16:44.695734
156	LINEA DE EMERGENCIAS	444	2025-12-15 16:16:44.695734
157	VENTANILLA ÚNICA	625	2025-12-15 16:16:44.695734
158	ESTACIÓN DE ENFERMERIA UCI-COVID	637-720	2025-12-15 16:16:44.695734
159	LINEA GRATUITA NACIONAL	018000413610	2025-12-15 16:16:44.695734
160	ZONA DE TRANSITO	513	2025-12-15 16:16:44.695734
\.


--
-- Data for Name: documentos; Type: TABLE DATA; Schema: public; Owner: user_intranet
--

COPY public.documentos (id, titulo, categoria, tipo, fecha, url, created_at) FROM stdin;
1	Política de Calidad Institucional	Gestión de Calidad	PDF	2023-10-01		2025-12-15 16:16:44.688024
2	Manual de Procesos y Procedimientos	Gestión de Calidad	PDF	2023-09-15		2025-12-15 16:16:44.688024
3	Mapa de Procesos 2024	Gestión de Calidad	IMG	2023-11-20		2025-12-15 16:16:44.688024
4	Reglamento Interno de Trabajo	Talento Humano	PDF	2022-05-10		2025-12-15 16:16:44.688024
5	Formato de Solicitud de Permisos	Talento Humano	DOCX	2023-01-20		2025-12-15 16:16:44.688024
6	Cronograma de Capacitaciones 2024	Talento Humano	XLSX	2023-12-05		2025-12-15 16:16:44.688024
7	Circular Normativa 001	Jurídica	PDF	2024-01-15		2025-12-15 16:16:44.688024
8	Resolución de Nombramientos	Jurídica	PDF	2023-11-30		2025-12-15 16:16:44.688024
9	Manual de Contratación	Contratación	PDF	2023-08-10		2025-12-15 16:16:44.688024
10	Formatos de Minutas	Contratación	ZIP	2023-08-12		2025-12-15 16:16:44.688024
\.


--
-- Data for Name: noticias; Type: TABLE DATA; Schema: public; Owner: user_intranet
--

COPY public.noticias (id, titulo, contenido, imagen_url, fecha_publicacion, autor, created_at) FROM stdin;
4	actualizacion del mapa de hospital	<div class="article-content">\r\n  <p class="lead">Introducción de la noticia: nueva noticia</p>\r\n\r\n  <div class="info-box">\r\n    <strong>Destacado:</strong> Resumen o frase clave de la noticia.\r\n  </div>\r\n\r\n  <h2>Desarrollo</h2>\r\n  <p>Cuerpo de la noticia. Detalla los acontecimientos aquí.</p>\r\n  \r\n  <h3>Conclusión</h3>\r\n  <p>Cierre de la nota informativa.</p>\r\n</div>	/uploads/news/1765821177551.png	2025-12-15	ADmins	2025-12-15 17:52:57.605704
5	otra noticia mas	<div class="article-content">\r\n  <p class="lead">Introducción de la noticia: otra noticia mas</p>\r\n\r\n  <div class="info-box">\r\n    <strong>Destacado:</strong> Resumen o frase clave de la noticia.\r\n  </div>\r\n\r\n  <h2>Desarrollo</h2>\r\n  <p>Cuerpo de la noticia. Detalla los acontecimientos aquí.</p>\r\n  \r\n  <h3>Conclusión</h3>\r\n  <p>Cierre de la nota informativa.</p>\r\n</div>	/uploads/news/1765827834664.png	2025-12-15	Admin	2025-12-15 19:43:54.757649
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: user_intranet
--

COPY public.usuarios (id, username, password, nombre, rol, created_at) FROM stdin;
1	admin	admin123	Administrador	admin	2025-12-15 16:16:44.683511
\.


--
-- Name: anuncios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user_intranet
--

SELECT pg_catalog.setval('public.anuncios_id_seq', 6, true);


--
-- Name: directorio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user_intranet
--

SELECT pg_catalog.setval('public.directorio_id_seq', 160, true);


--
-- Name: documentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user_intranet
--

SELECT pg_catalog.setval('public.documentos_id_seq', 10, true);


--
-- Name: noticias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user_intranet
--

SELECT pg_catalog.setval('public.noticias_id_seq', 5, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user_intranet
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- Name: anuncios anuncios_pkey; Type: CONSTRAINT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.anuncios
    ADD CONSTRAINT anuncios_pkey PRIMARY KEY (id);


--
-- Name: directorio directorio_pkey; Type: CONSTRAINT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.directorio
    ADD CONSTRAINT directorio_pkey PRIMARY KEY (id);


--
-- Name: documentos documentos_pkey; Type: CONSTRAINT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_pkey PRIMARY KEY (id);


--
-- Name: noticias noticias_pkey; Type: CONSTRAINT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT noticias_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_username_key; Type: CONSTRAINT; Schema: public; Owner: user_intranet
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

\unrestrict LWfOfFdkabOOl6ifwgYCqJeCBxdGMmM6Rr8CBEhyCyCtOdVtARtMXeq0iFpFNLQ

