// Definir la clase del objeto
class User {
    constructor(id_user, name, email, password, lastname, age, location, description, title, phrase, status, type) {
        this.Id_User = id_user;
        this.Name = name;
        this.Email = email;
        this.Password = password;
        this.Lastname = lastname;
        this.Age = age;
        this.Location = location;
        this.Description = description;
        this.Title = title;
        this.Phrase = phrase;
        this.Status = status;
        this.Type = type;
    }

    // Método para crear una instancia de Persona con solo nombre y correo
    static Login(email, password) {
        return new Persona(null, null, email, password, null, null, null, null, null, null, null, null);
    }
}