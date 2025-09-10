// Classe Database
class Database {
  constructor() {

    if (Database.instance) {
      return Database.instance;
    }

    this.connectionString = []
    this.queryHistory = []

    this.id = Math.round(Math.random() * 100);
    console.log(`🔌 Nova conexão criada: ${this.id}`);

    Database.instance = this;
  }

  query(sql) {
    this.queryHistory.push(sql)
    console.log(`Executando query [${sql}] na conexão ${this.id}`);
  }

  createConnection(connectionString) {
    this.connectionString.push(connectionString)
  }

  showConnections() {
    console.log(this.connectionString);
  }

  showQueries() {
    console.log(this.queryHistory);
  }
}

// Cliente cria várias conexões (mesmo que não precise)
const db1 = new Database();
db1.createConnection("db://meu-banco")
db1.query("SELECT * FROM users");

const db2 = new Database();
db2.createConnection("db://seu-banco")
db2.query("SELECT * FROM products");

db1.showConnections()
db1.showQueries()

db2.showConnections()
db2.showQueries()