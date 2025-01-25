import "./AuthForm.scss";
import { Input, LabelInput, Submit, Textarea } from "./FormComponent";
import SlotBooking from "./SlotBooking";

const AuthForm = () => {
  return (
    <div className="form_container vw-full grid-center">
      <div className="form_item_container">
        <div className="form_head">
          <h1>Appointment Request Form</h1>
          <p>Let us know how we can help you?</p>
        </div>
        <div className="form_group">
          <div className="group group_1">
            <label>Full Name</label>
            <div className="group_input_wrapper w-full">
              <Input
                type="text"
                class="half_width"
                placeholder="First Name"
                required={true}
              />
              <Input
                type="text"
                class="half_width"
                placeholder="Last Name"
                required={true}
              />
            </div>
          </div>
          <div className="group group_2">
            <div className="group_input_wrapper w-full">
              <LabelInput
                type="email"
                class="half_width"
                labelName="Email"
                placeholder="Enter Email Address"
                required={true}
              />
              <LabelInput
                type="number"
                class="half_width"
                labelName="Contact"
                placeholder="Enter 10-Digit Mobile Number"
                required={true}
              />
            </div>
          </div>
          <div className="group group_3">
            <label>Address</label>
            <div className="group_input_wrapper w-full">
              <Input
                type="text"
                placeholder="Street Address Line 1"
                required={true}
              />
              <Input
                type="text"
                placeholder="Street Address Line 2"
                required={true}
              />
              <Input
                type="text"
                class="half_width"
                placeholder="City"
                required={true}
              />
              <Input
                type="text"
                class="half_width"
                placeholder="State"
                required={true}
              />
              <Input
                type="text"
                placeholder="Postal / Zip Code"
                required={true}
              />
            </div>
          </div>
          <div className="group group_4">
            <Textarea
              type="text"
              class="textarea"
              labelName="What Service are you looking for?"
              placeholder="First Name"
              required={true}
            />
          </div>

          <SlotBooking />

          <Submit class="form_submit" value="Submit" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
