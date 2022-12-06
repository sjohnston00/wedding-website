import React, { useRef } from "react";
import { Form, useActionData, useTransition } from "@remix-run/react";

function RSVP() {
  return <div>RSVP</div>;
}

function RSVPForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const foodOptionsRef = useRef<HTMLDivElement>(null);
  const actionData = useActionData();
  const transition = useTransition();

  if (actionData) {
    formRef.current?.reset();
    if (foodOptionsRef.current) {
      foodOptionsRef.current.hidden = true;
    }
  }
  return (
    <div className='rsvp'>
      <Form method='post' ref={formRef} className='rsvp-form'>
        <h1 id='rsvp'>RSVP</h1>
        <span>{actionData?.error}</span>
        <span>{actionData?.message}</span>
        <div className='flex justify-around gap-2'>
          <div className='form-group'>
            <label htmlFor='name'>Full Name</label>
            <input
              type='text'
              name='name'
              id='name'
              autoComplete='name'
              maxLength={255}
              required
            />
          </div>
          <div className='form-group' hidden>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              id='email'
              autoComplete='email'
              maxLength={255}
              // required
            />
          </div>
        </div>
        <fieldset>
          <label className='block'>Will you be attending?</label>
          <div className='checkboxes'>
            <label className='checkbox' htmlFor='rsvp-yes'>
              <input
                type='radio'
                name='rsvp'
                id='rsvp-yes'
                value='yes'
                onChange={() => {
                  if (!foodOptionsRef.current) return;
                  foodOptionsRef.current.hidden = false;
                }}
                required
              />
              Yes
            </label>
            <label className='checkbox' htmlFor='rsvp-no'>
              <input
                type='radio'
                name='rsvp'
                id='rsvp-no'
                value='no'
                onChange={() => {
                  if (!foodOptionsRef.current) return;
                  foodOptionsRef.current.hidden = true;
                }}
                required
              />
              No
            </label>
          </div>
        </fieldset>
        <div id='food-options' ref={foodOptionsRef} hidden>
          <h2>Food Options</h2>
          <fieldset>
            <h3>Starter</h3>
            <label className='block'>
              <input
                type='radio'
                name='starter'
                id='starter'
                value='starter-1'
              />
              Starter 1
            </label>
            <label className='block'>
              <input
                type='radio'
                name='starter'
                id='starter'
                value='starter-2'
              />
              Starter 2
            </label>
          </fieldset>
          <fieldset>
            <h3>Main Course</h3>
            <label className='block'>
              <input
                type='radio'
                name='mainCourse'
                id='mainCourse'
                value='mainCourse-1'
              />
              mainCourse 1
            </label>
            <label className='block'>
              <input
                type='radio'
                name='mainCourse'
                id='mainCourse'
                value='mainCourse-2'
              />
              mainCourse 2
            </label>
          </fieldset>
          <fieldset>
            <h3>Dessert</h3>
            <label className='block'>
              <input
                type='radio'
                name='dessert'
                id='dessert'
                value='dessert-1'
              />
              dessert 1
            </label>
            <label className='block'>
              <input
                type='radio'
                name='dessert'
                id='dessert'
                value='dessert-2'
              />
              dessert 2
            </label>
          </fieldset>
        </div>

        <div className='form-group'>
          <label className='block' htmlFor='questionOrComments'>
            Questions or Comments
          </label>
          <input
            type='text'
            name='questionOrComments'
            id='questionOrComments'
            autoComplete='off'
          />
        </div>
        <button
          className='inline-block'
          type='submit'
          disabled={transition.state === "submitting"}>
          Submit
        </button>
      </Form>
    </div>
  );
}

RSVP.Form = RSVPForm;
export default RSVP;
