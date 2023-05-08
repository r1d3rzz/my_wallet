<template>
  <div class="row">
    <div class="col-md">
      <div class="card">
        <div class="card-header">
          <div class="fs-3">Create A Credit Card</div>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group mb-3">
              <label for="name">Name</label>
              <input type="text" id="name" class="form-control" />
            </div>

            <div class="form-group mb-3">
              <label for="email">Email</label>
              <input type="email" id="email" class="form-control" />
            </div>

            <div class="form-group mb-3">
              <label for="">Gender</label>
              <select
                class="form-select form-select-md mb-3"
                aria-label=".form-select-md example"
              >
                <option value="male" selected>Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group mb-3">
              <label for="password">Password</label>
              <input type="password" id="password" class="form-control" />
            </div>

            <div class="form-group mb-3">
              <label for="amount">Add Card Amount</label>
              <div class="input-group">
                <input
                  type="number"
                  id="amount"
                  class="form-control"
                  value="5000"
                />
                <span class="input-group-text" id="basic-addon1">MMK</span>
              </div>
            </div>

            <div class="d-flex justify-content-end mt-2">
              <button class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
