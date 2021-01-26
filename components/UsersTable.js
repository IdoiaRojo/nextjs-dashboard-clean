import "tabler-react/dist/Tabler.css";
import {
  Avatar,
  Icon,
  Table
} from "tabler-react";

const UsersTable = ({ users }) => {
  console.log("------- users ------- ");
  console.log(users);
  return (
    <Table
      cards={true}
      striped={true}
      responsive={true}
      className="table-vcenter"
    >
      <Table.Header>
        <Table.Row>
          <Table.ColHeader colSpan={2}>User</Table.ColHeader>
          <Table.ColHeader>Plan</Table.ColHeader>
          <Table.ColHeader>Fecha de inicio</Table.ColHeader>
          <Table.ColHeader>Activo hasta</Table.ColHeader>
          <Table.ColHeader>State</Table.ColHeader>
          <Table.ColHeader />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users && users.map(u =>
          <Table.Row key={u.id}>
            <Table.Col className="w-1">
              {/* <Avatar imageURL="./demo/faces/male/9.jpg" /> */}
            </Table.Col>
            <Table.Col>{u.nickname}</Table.Col>
            <Table.Col className="text-nowrap">{u.plan_name}</Table.Col>
            <Table.Col className="text-nowrap">{u.active_from}</Table.Col>
            <Table.Col className="text-nowrap">{u.active_until}</Table.Col>
            <Table.Col>
              <span className={u.state ? "status-icon bg-success" : "status-icon bg-danger"} /> State
            </Table.Col>
            <Table.Col className="w-1">
              <Icon link={true} name="trash" />
            </Table.Col>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

export default UsersTable;
