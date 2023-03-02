import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

function Ticket({ ticket }: { ticket: Ticket }) {
  const date = new Date(ticket.dateOfPurchase);

  function SelectedNumbers() {
    return (
      <div className="flex flex-wrap space-x-2 text-center">
        {ticket.numbers.map((number) => (
          <div className="w-10 border-2 border-sky-500 p-1" key={number}>{number}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-2/3 flex-col justify-center space-y-2 border border-slate-800 p-6">
      <div className="mb-2 flex flex-row items-center justify-between">
        <h5 className="text-2xl font-bold text-gray-900">{ticket.owner}</h5>
        <p>{date.toLocaleDateString()}</p>
      </div>
      <p>Ticket price: R$ {ticket.totalPrice}</p>
      <SelectedNumbers />
    </div>
  );
}

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    const response = await axios.get(`${BASE_URL}/tickets`);
    setTickets(response.data);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === '') {
      fetchTickets();
      return;
    }

    const filteredTickets = tickets.filter((ticket) =>
      ticket.owner.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setTickets(filteredTickets);
  }

  return (
    <>
      <h1 className="mt-4 text-center text-4xl font-bold text-slate-900">
        View the tickets already sold
      </h1>
      <div className="mx-auto mt-8 flex flex-col items-center justify-center space-y-2">
        <h2 className="text-center font-semibold">
          Look for a specific person
        </h2>
        <input
          className="w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
          type="text"
          onChange={handleChange}
        />
      </div>

      <main className="flex flex-col space-y-4 p-4">
        {tickets.map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </main>
    </>
  );
}

export default App;
