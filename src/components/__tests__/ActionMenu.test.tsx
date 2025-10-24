import { render, screen, fireEvent } from "@testing-library/react";
import ActionMenu from "@/components/Dashboard/UserTable/ActionMenu";
import { useRouter } from "next/navigation";
import { User } from "@/hooks/useUsers";


jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ActionMenu Component", () => {
  const mockRouterPush = jest.fn();
  const mockOnClose = jest.fn();
  const mockOnBlacklist = jest.fn();
  const mockOnActivate = jest.fn();

  // mock user
  const mockUser: User = {
    id: "1",
    organization: "Acme Corp",
    username: "johndoe",
    email: "john@example.com",
    phone: "+2348012345678",
    dateJoined: "2024-05-20",
    status: "Active",
    profileDetails: {
      fullName: "John Doe",
      bvn: "22334455",
      gender: "Male",
      maritalStatus: "Single",
      children: "None",
      residence: "Lagos",
    },
    education: {
      level: "BSc",
      employmentStatus: "Employed",
      sector: "Tech",
      duration: "5 years",
      officeEmail: "john.doe@acme.com",
      monthlyIncome: "₦300,000 - ₦400,000",
      loanRepayment: "₦20,000",
    },
    socials: {
      twitter: "@johndoe",
      facebook: "fb.com/johndoe",
      instagram: "@johndoe",
    },
    guarantor: {
      fullName: "Jane Smith",
      phoneNumber: "+2348098765432",
      email: "jane.smith@example.com",
      relationship: "Friend",
    },
    account: {
      balance: "₦500,000",
      bank: "Zenith Bank",
    },
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    jest.clearAllMocks();
  });

  // Positive Scenario
  it("navigates to details page when 'View Details' is clicked", () => {
    render(
      <ActionMenu
        user={mockUser}
        onClose={mockOnClose}
        onBlacklist={mockOnBlacklist}
        onActivate={mockOnActivate}
      />
    );

    const button = screen.getByText(/View Details/i);
    fireEvent.click(button);

    expect(mockOnClose).toHaveBeenCalled(); // menu should close
    expect(mockRouterPush).toHaveBeenCalledWith("/dashboard/users/1"); // correct navigation
  });

  // Negative Scenario
  it("does NOT navigate when clicking outside the action buttons", () => {
    render(
      <ActionMenu
        user={mockUser}
        onClose={mockOnClose}
        onBlacklist={mockOnBlacklist}
        onActivate={mockOnActivate}
      />
    );

    const menu = screen.getByRole("button", { name: /View Details/i }).parentElement!;
    fireEvent.click(menu); // this is to simulate click inside menu (not the button)
    expect(mockRouterPush).not.toHaveBeenCalled(); // expected not to navigate
  });
});
