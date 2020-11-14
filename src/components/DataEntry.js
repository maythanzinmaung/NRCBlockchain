import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./dataEntryStyle.css";
import Web3 from "web3";
import Swal from "sweetalert2";
import Navigation from "./Navigation";
import { nrcRegistration } from "./NRCABI";

const web3 = new Web3(
  new Web3.providers.HttpProvider("http://127.0.0.1:8545/")
);

const NRCRegistrationContract = new web3.eth.Contract(
  nrcRegistration,
  "0x130a7Af5C6bdD3Af3152f301ba8331C057beE6b0"
);

class DataEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nrcNo: "",
      issuedDate: "",
      name: "",
      fName: "",
      birthday: "",
      randr: "",
      height: "",
      bloodType: "",
      pFeature: "",
      show: false,
    };
    this.handleNRCno = this.handleNRCno.bind(this);
    this.handleIssuedDate = this.handleIssuedDate.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleFatherName = this.handleFatherName.bind(this);
    this.handleBirthday = this.handleBirthday.bind(this);
    this.handleRaceAndReligion = this.handleRaceAndReligion.bind(this);
    this.handleHeight = this.handleHeight.bind(this);
    this.handleBloodType = this.handleBloodType.bind(this);
    this.handleProminentFeature = this.handleProminentFeature.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.storeData = this.storeData.bind(this);
    this.addingData = this.addingData.bind(this);
  }

  handleNRCno(event) {
    this.setState({
      nrcNo: event.target.value
    });
  }
  handleIssuedDate(event) {
    this.setState({
      issuedDate: event.target.value,
    });
  }
  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  handleFatherName(event) {
    this.setState({
      fName: event.target.value,
    });
  }
  handleBirthday(event) {
    this.setState({
      birthday: event.target.value,
    });
  }
  handleRaceAndReligion(event) {
    this.setState({
      randr: event.target.value,
    });
  }
  handleHeight(event) {
    this.setState({
      height: event.target.value,
    });
  }
  handleBloodType(event) {
    this.setState({
      bloodType: event.target.value,
    });
  }
  handleProminentFeature(event) {
    this.setState({
      pFeature: event.target.value,
    });
  }

  handleSubmit() {
    // if (
    //   Object.keys(this.state.nrcNo).length === 0 ||
    //   Object.keys(this.state.issuedDate).length === 0 ||
    //   Object.keys(this.state.name).length === 0 ||
    //   Object.keys(this.state.fName).length === 0 ||
    //   Object.keys(this.state.birthday).length === 0 ||
    //   Object.keys(this.state.randr).length === 0 ||
    //   Object.keys(this.state.height).length === 0 ||
    //   Object.keys(this.state.bloodType).length === 0 ||
    //   Object.keys(this.state.pFeature).length === 0
    // ) {
    //   alert("Form data can't be blank");
    // } else {
    //   // const inputData =
    //   //   this.state.nrcNo +
    //   //   this.state.issuedDate +
    //   //   this.state.name +
    //   //   this.state.fName +
    //   //   this.state.birthday +
    //   //   this.state.randr +
    //   //   this.state.height +
    //   //   this.state.bloodType +
    //   //   this.state.pFeature;
    //   // const rawData = inputData.replace(/[, ]+/g, "").toLowerCase();
    //   // const hashData = web3.utils.keccak256(rawData);
      this.storeData();
       
  }

  async storeData() {
    const account = await web3.eth.getAccounts();
    Swal.fire({
      title: "Enter Password",
      width: "600px",
      padding: "10px",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showConfirmButton: true,
      confirmButtonText: "Store",
      showCancelButton: true,
      cancelButtonText: "Back",
      reverseButtons: true,
      customClass: {
        button: "swal-button",
        title: "swal-title",
        html: "swal-html",
        input: "swal-input",
      },
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        return web3.eth.personal
          .unlockAccount(account[0], password)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Wrong Password. Please try again!!`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      // if (result.value) {
      //   web3.eth
      //     .sendTransaction({
      //       from: account[0],
      //       to: account[0],
      //       data: hash,
      //     })
      //     .on("transactionHash", function (hash) {
      //       console.log(hash);
      //       Swal.fire({
      //         title: "Data Stored Successfully!!",
      //         html: `Your transaction hash is <b>${hash}</b>`,
      //         footer: "Remember your Transaction Hash!",
      //       });
      //     });
      // }

      if (result.value) {
        this.addingData();
      }
    });
  }

  async addingData() {
    const account = await web3.eth.getAccounts();
    const gas = await NRCRegistrationContract.methods
      .addingData(
        this.state.nrcNo.replace(/[, ]+/g, "").toLowerCase(),
        this.state.issuedDate,
        this.state.name,
        this.state.fName,
        this.state.birthday,
        this.state.randr,
        this.state.height,
        this.state.bloodType,
        this.state.pFeature
      )
      .estimateGas();
    await NRCRegistrationContract.methods
      .addingData(
        this.state.nrcNo.replace(/[, ]+/g, "").toLowerCase(),
        this.state.issuedDate,
        this.state.name,
        this.state.fName,
        this.state.birthday,
        this.state.randr,
        this.state.height,
        this.state.bloodType,
        this.state.pFeature
      )
      .send({ from: account[0], gas })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <div>
        <Navigation />
        <div className="body">
          <form className="form" onSubmit={this.handleSubmit}>
            <div>
              <h2 style={{ textAlign: "center", color: "#1B4F72" }}>
                National Registration Card Data
              </h2>
            </div>
            <hr />

            <label>NRC Card Number</label>
            <input
              type="text"
              className="input"
              value={this.state.nrcNo}
              onChange={this.handleNRCno}
            />

            <label>Issued Date</label>
          <input
            type="date"
            style={{ width: "178px", height: "24px" }}
            className="input"
            value={this.state.issuedDate}
            onChange={this.handleIssuedDate}
          />

            <label>Name</label>
            <input
              type="text"
              className="input"
              value={this.state.name}
              onChange={this.handleName}
            />

            <label>Father Name</label>
            <input
              type="text"
              className="input"
              value={this.state.fName}
              onChange={this.handleFatherName}
            />

            <label>Date of Birth</label>
            <input
              type="date"
              style={{ width: "178px", height: "24px" }}
              className="input"
              value={this.state.birthday}
              onChange={this.handleBirthday}
            />

            <label>Race & Religion</label>
            <input
              type="text"
              className="input"
              value={this.state.randr}
              onChange={this.handleRaceAndReligion}
            />

            <label>Height</label>
            <input
              type="text"
              className="input"
              value={this.state.height}
              onChange={this.handleHeight}
            />

            <label>Blood Type</label>
            <input
              type="text"
              className="input"
              value={this.state.bloodType}
              onChange={this.handleBloodType}
            />

            <label>Prominent Feature</label>
            <textarea
              roll="2"
              value={this.state.pFeature}
              onChange={this.handleProminentFeature}
            ></textarea>
            <button
              type="button"
              style={{
                width: "130px",
                height: "30px",
                borderStyle: "double",
                fontSize: "16px",
                fontWeight: "bold",
                
              }}
              onClick={this.handleSubmit}
            >
              Store Data
            </button>
          </form>
        </div>
        {/* <div className="pendingSection">
          <label>pending</label>
          <label>pending</label>
        </div> */}
      </div>
    );
  }
}
export default withRouter(DataEntry);
