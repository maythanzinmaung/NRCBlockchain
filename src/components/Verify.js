import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./verificationStyle.css";
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
class Verify extends Component {
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
      tranHash: "",
      blockNo: "",
      tranIndex: "",
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
    this.checkValidity = this.checkValidity.bind(this);
    this.handleHash = this.handleHash.bind(this);
  }

  handleNRCno(event) {
    this.setState({
      nrcNo: event.target.value,
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

  handleHash(event) {
    this.setState({
      tranHash: event.target.value,
    });
  }

  async checkValidity() {
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
    //   const inputData =
    //     this.state.nrcNo +
    //     this.state.issuedDate +
    //     this.state.name +
    //     this.state.fName +
    //     this.state.birthday +
    //     this.state.randr +
    //     this.state.height +
    //     this.state.bloodType +
    //     this.state.pFeature;
    //   const rawData = inputData.replace(/[, ]+/g, "").toLowerCase();
    //   const inputDataHash = web3.utils.keccak256(rawData);
    //   this.setState({ inputDataHash: inputDataHash });
    //   await web3.eth
    //     .getTransactionReceipt(`${this.state.tranHash}`)
    //     .then((response) => {
    //       var blockNo = response.blockNumber;
    //       var tranIndex = response.transactionIndex;
    //       this.setState({ blockNo: blockNo, tranIndex: tranIndex });
    //     });
    //   web3.eth.getBlock(this.state.blockNo, true).then((res) => {
    //     const storedDataHash = res.transactions[this.state.tranIndex].input;
    //     console.log(inputDataHash);
    //     console.log(storedDataHash);
    //     if (inputDataHash === storedDataHash) {
    //       Swal.fire({

    //       })
    //     } else {
    //       console.log("invalid");
    //     }
    //   });
    // }
    await NRCRegistrationContract.methods
      .getNRCDetail(this.state.nrcNo.replace(/[, ]+/g, "").toLowerCase())
      .call()
      .then((res) => {
        console.log(res)
        if(res[0]==="5/KaBaLa(N)207278"){
          console.log("Verified")
        }
      })
      .catch((e) => console.log(e));
    // await NRCRegistrationContract.methods.countIssuedNRC().call().then(res=>console.log(res)).catch(e=>console.log(e))
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="bodyStyle">
          <form className="formStyle" onSubmit={this.submittedData}>
            <div>
              <h2 style={{ textAlign: "center", color: "#1B4F72" }}>
                Citizenship Validation
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
            <label>Transaction Hash</label>
            <textarea
              roll="2"
              value={this.state.tranHash}
              onChange={this.handleHash}
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
              onClick={this.checkValidity}
            >
              Check Validity
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Verify);
