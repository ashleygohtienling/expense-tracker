const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
};

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [contact, setContact] = useState({
    userFirstname: "Coder",
    userLastname: "Byte",
    userPhone: "8885559999",
  });
  const setDetails = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addEntryToPhoneBook(contact);
  };
  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        value={contact.userFirstname}
        onChange={(event) => setDetails(event)}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        value={contact.userLastname}
        onChange={(event) => setDetails(event)}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
        value={contact.userPhone}
        onChange={(event) => setDetails(event)}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable({ contacts }) {
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>FirstName</th>
          <th style={style.tableCell}>LastName</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, index) => (
          <tr key={index}>
            <td style={style.tableCell}>{contact.userFirstname}</td>
            <td style={style.tableCell}>{contact.userLastname}</td>
            <td style={style.tableCell}>{contact.userPhone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const PhoneBook = (props) => {
  const [formData, setFormData] = useState([]);

  const handleFormDataSubmit = (data) => {
    setFormData((previousData) =>
      [...previousData, data].sort((a, b) =>
        a.userLastname.toLowerCase() > b.userLastname.toLowerCase() ? 1 : -1
      )
    );
  };

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={handleFormDataSubmit} />
      {formData && <InformationTable contacts={formData} />}
    </section>
  );
};

export default PhoneBook;
