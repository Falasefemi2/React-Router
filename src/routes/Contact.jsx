import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../Contact";
import Favorite from "./Favorite";

export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    return { contact };
  }

const Contact = () => {
    const { contacts } = useLoaderData();
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };
  return (
    <div id="contact">
      <div>
        <img src={contact.avatar || null} alt="img" key={contact.avatar} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>
        {contact.twitter && (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`} target="_blank">
              {contact.twitter}
            </a>
          </p>
        )}
        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
