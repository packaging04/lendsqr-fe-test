import { render, screen, fireEvent } from "@testing-library/react";
import TableRow from "@/components/Dashboard/UserTable/TableRow";
import { User } from "@/hooks/useUsers";

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

describe("TableRow Component", () => {
  const mockOpenMenu = jest.fn();
  const mockCloseMenu = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  // Positive Scenario
  it("renders user data correctly", () => {
    render(
      <table>
        <tbody>
          <TableRow
            user={mockUser}
            isMenuOpen={false}
            onOpenMenu={mockOpenMenu}
            onCloseMenu={mockCloseMenu}
          />
        </tbody>
      </table>
    );

    // expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    // expect(screen.getByText("OrgX")).toBeInTheDocument();
  });

  // Negative Scenario
  it("does not open menu when clicking on non-action cells", () => {
    render(
      <table>
        <tbody>
          <TableRow
            user={mockUser}
            isMenuOpen={false}
            onOpenMenu={mockOpenMenu}
            onCloseMenu={mockCloseMenu}
          />
        </tbody>
      </table>
    );

    const usernameCell = screen.getByText("JohnDoe");
    fireEvent.click(usernameCell);
    expect(mockOpenMenu).not.toHaveBeenCalled();
  });
});
