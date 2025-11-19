import React from "react";
import { useForm } from "react-hook-form";
import styles from "./UseForm.module.scss";

function UseForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Create User</h2>

     
        <div className={styles.field}>
          <label>Name</label>
          <input
            {...register("name", { required: "Ad boş ola bilməz" })}
            placeholder="Adınızı daxil edin"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

     
        <div className={styles.field}>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email boş ola bilməz",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email formatı səhvdir",
              },
            })}
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <button className={styles.btn} type="submit">Göndər</button>
      </form>
    </div>
  );
}

export default UseForm;
