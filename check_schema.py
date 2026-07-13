import psycopg2

conn = psycopg2.connect(
    host='localhost', port=5432, database='aitechpulze',
    user='postgres', password='Pvbn@7738'
)
cur = conn.cursor()

tables = ['attendance', 'certificates', 'internships', 'leads', 'tasks', 'task_submissions', 'payments', 'mock_interviews', 'daily_standups']

for table in tables:
    print(f"\n=== {table.upper()} ===")
    cur.execute(f"""
        SELECT column_name, data_type, udt_name, is_nullable
        FROM information_schema.columns
        WHERE table_name = '{table}'
        ORDER BY ordinal_position
    """)
    for row in cur.fetchall():
        print(f"  {row[0]} | {row[1]} | nullable={row[3]}")

conn.close()
