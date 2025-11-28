import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { fetchAPI, submitAPI } from "../api";

// ✅ Mock the API functions
jest.mock("../api", () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn(),
}));

describe("BookingForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form fields", () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /make your reservation/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  test("updates available times when date is selected", () => {
    fetchAPI.mockReturnValue(["18:00", "19:00"]);
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2025-12-01" },
    });

    expect(fetchAPI).toHaveBeenCalled();
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.getByText("19:00")).toBeInTheDocument();
  });

  test("shows error if date is in the past", () => {
    fetchAPI.mockReturnValue(["18:00"]); // ✅ ensure array
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2020-01-01" },
    });
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));

    expect(screen.getByText(/date cannot be in the past/i)).toBeInTheDocument();
  });

  test("shows error if guests are out of range", () => {
    fetchAPI.mockReturnValue(["18:00"]); // ✅ ensure array
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2025-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "15" },
    });
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));

    expect(screen.getByText(/guests must be between 1 and 10/i)).toBeInTheDocument();
  });

  test("submits successfully and shows success message", () => {
    fetchAPI.mockReturnValue(["18:00"]);
    submitAPI.mockReturnValue(true);

    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2025-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));

    expect(submitAPI).toHaveBeenCalledWith({
      resDate: "2025-12-01",
      resTime: "18:00",
      guests: 4,
      occasion: "Birthday",
    });
    expect(screen.getByText(/reservation confirmed/i)).toBeInTheDocument();
  });

  test("shows error if submitAPI fails", () => {
    fetchAPI.mockReturnValue(["18:00"]);
    submitAPI.mockReturnValue(false);

    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2025-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test("reset button clears the form", () => {
    fetchAPI.mockReturnValue(["18:00"]); // ✅ ensure array
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2025-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "5" },
    });

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByLabelText(/choose date/i)).toHaveValue("");
    expect(screen.getByLabelText(/number of guests/i)).toHaveValue(1);
    expect(screen.getByLabelText(/occasion/i)).toHaveValue("Birthday");
  });

  test("allows changing occasion", () => {
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: { value: "Business" },
    });
    expect(screen.getByLabelText(/occasion/i)).toHaveValue("Business");
  });

  test("accepts boundary values for guests (1 and 10)", () => {
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "1" },
    });
    expect(screen.getByLabelText(/number of guests/i)).toHaveValue(1);

    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "10" },
    });
    expect(screen.getByLabelText(/number of guests/i)).toHaveValue(10);
  });
});
