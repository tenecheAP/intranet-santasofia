import sqlite3
import psycopg2

# Conectar a SQLite (base de datos del scraping)
sqlite_conn = sqlite3.connect('documentos_analizados.db')
sqlite_cursor = sqlite_conn.cursor()

# Conectar a PostgreSQL (base de datos de la nueva intranet)
pg_conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="intranet_db",
    user="user_intranet",
    password="strong_password"
)
pg_cursor = pg_conn.cursor()

# Obtener todos los documentos de SQLite
sqlite_cursor.execute("""
    SELECT nombre_sugerido, genero_sugerido, extension, url 
    FROM documentos_analizados 
    WHERE url IS NOT NULL AND url LIKE '%http%'
""")

documentos = sqlite_cursor.fetchall()

print(f"Total de documentos a migrar: {len(documentos)}")

# Migrar cada documento
migrados = 0
errores = 0

for doc in documentos:
    nombre = doc[0] or "Sin título"
    categoria = doc[1] or "General"
    extension = doc[2] or "PDF"
    url_vieja = doc[3]
    
    # Convertir URL
    # De: http://intranet/documentos/[ruta]
    # A: https://192.168.40.81:10000/filemin/... (necesitamos la ruta completa)
    
    # Por ahora, solo reemplazamos el dominio
    url_nueva = url_vieja.replace('http://intranet', 'https://192.168.40.81:10000/intraweb')
    
    try:
        # Insertar en PostgreSQL
        pg_cursor.execute("""
            INSERT INTO documentos (titulo, categoria, tipo, fecha, url)
            VALUES (%s, %s, %s, CURRENT_DATE, %s)
        """, (nombre[:200], categoria[:50], extension[:10], url_nueva[:500]))
        
        migrados += 1
        
        if migrados % 100 == 0:
            print(f"Migrados: {migrados}")
            
    except Exception as e:
        errores += 1
        print(f"Error con documento '{nombre}': {e}")

# Confirmar cambios
pg_conn.commit()

print(f"\n=== Resumen ===")
print(f"Total documentos: {len(documentos)}")
print(f"Migrados exitosamente: {migrados}")
print(f"Errores: {errores}")

# Cerrar conexiones
sqlite_conn.close()
pg_conn.close()
