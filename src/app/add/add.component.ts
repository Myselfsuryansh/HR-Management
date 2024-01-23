import { Component, OnChanges, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

function emailValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const email: string = control.value;
  if (email && !email.toLowerCase().endsWith('.com')) {
    return { invalidEmail: true };
  }
  return null;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  nameSearch: string = '';
  selectSearch: string = '';
  employeeForm!: FormGroup;
  employeeData: any[] = [];
  submitted = false;
  isSaved = false;
  password1: string = '';
  confirmPass: string = '';
  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.filteredEmployeeData = this.employeeData;
  }
  toggleStatusArray: boolean[] = this.employeeData.map(() => false);
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      department: ['', Validators.required],
      empName: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      joinDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailValidator]],
      salary: ['', Validators.required],
      file: [''],
      documentType: [''],
      password: ['', Validators.required],
      confirmPass: [
        '',
        [Validators.required, this.confirmedValidator.bind(this)],
      ],
      empStatus: ['', Validators.requiredTrue],
    });
    this.getEmployeeData();
    this.employeeForm.get('email')?.valueChanges.subscribe((email) => {
      this.checkEmailAvailability(email);
    });
    this.employeeForm.get('mobile')?.valueChanges.subscribe((mobile) => {
      this.checkMobileAvailability(mobile);
    });
  }
  date1!: Date;

  get f() {
    return this.employeeForm.controls ?? {};
  }

  confirmedValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('password');
    const confirmPassword = control.value;

    if (password && confirmPassword !== password.value) {
      return { confirmedValidator: true };
    }
    return null;
  }

  onSubmit() {
    if (this.employeeForm.value.empStatus == '') {
      this.toastr.error('CheckBox is not checked');
    }
    if (
      this.employeeForm?.invalid ||
      this.employeeForm?.get('email')?.hasError('emailInUse')
    ) {
      return;
    }
    this.submitted = true;
    this.isSaved = true;
    if (this.employeeForm.invalid) {
      return;
    }

    let data = {
      ...this.employeeForm.value,
    };
    const documentType = this.employeeForm.value.documentType;
    const file = this.employeeForm.value.file;
    console.log('Document Type:', documentType);
    console.log('Selected File:', file);

    this.service.postData(data).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Data Added Successfully');
        this.getEmployeeData();
      } else {
        this.toastr.error(res.error, 'error');
      }
    });
    console.log(this.employeeForm.value);
  }
  getEmployeeData() {
    this.service.getData().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.filteredEmployeeData = res;
      }
    });
  }

  cancelBtn() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeForm.reset();
        this.toastr.success('Form Cancelled Successfully');

        if (!this.isSaved) {
          return Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to cancel?',
            icon: 'question',
          }).then((innerResult) => {
            if (innerResult.isConfirmed) {
              return Promise.resolve(true);
            } else if (innerResult.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Not Cancelled', 'The data is safe :)', 'info');
              return Promise.resolve(false);
            }
            return null;
          });
        } else {
          return Promise.resolve(true);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Not Cancelled', 'The data is safe :)', 'info');
        return Promise.resolve(false);
      }

      // Add a default return statement to satisfy TypeScript
      return Promise.resolve(false);
    });
  }

  resetBtn() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reset it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeForm.reset();
        this.toastr.success('Form Cancelled Successfully');

        if (!this.isSaved) {
          return Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to cancel?',
            icon: 'question',
          }).then((innerResult) => {
            if (innerResult.isConfirmed) {
              return Promise.resolve(true);
            } else if (innerResult.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Not Resetted', 'The data is safe :)', 'info');
              return Promise.resolve(false);
            }
            return null;
          });
        } else {
          return Promise.resolve(true);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Not Resetted', 'The data is safe :)', 'info');
        return Promise.resolve(false);
      }

      // Add a default return statement to satisfy TypeScript
      return Promise.resolve(false);
    });
  }

  onDelete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((res: any) => {
          if (res) {
            Swal.fire('Deleted!', 'The data has been deleted.', 'success');
            this.getEmployeeData();
          } else {
            Swal.fire('Error', 'Unable to delete the data.', 'error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Not Cancelled', 'The data is safe :)', 'info');
      }
    });
  }

  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  password: string = '';
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  onToggleChange(index: number) {
    this.toggleStatusArray[index] = !this.toggleStatusArray[index];
  }

  sortOrder: string = 'asc';
  sortedColumn: string = '';

  sortBy(column: string): void {
    if (column !== 'department') {
      return;
    }

    if (this.sortedColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
      this.sortedColumn = column;
    }

    this.employeeData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  searchTerm: string = '';

  filteredEmployeeData!: any[];

  applyFilter() {
    // Use the filter method to match the search term with employee names
    this.filteredEmployeeData = this.employeeData.filter((data) =>
      data.empName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange() {
    this.applyFilter();
  }
  itemsPerPage = 5;
  currentPage = 1;

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
  }

  pagedEmployeeData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEmployeeData.slice(startIndex, endIndex);
  }

  checkEmailAvailability(email: string): void {
    this.service.checkEmailAvailability(email).subscribe((isAvailable) => {
      if (!isAvailable) {
        this.employeeForm?.get('email')?.setErrors({ emailInUse: true });
        this.toastr.error('Email is already used. Try Another Email');
      }
    });
  }

  checkMobileAvailability(mobile: string): void {
    this.service.checkMobileAvailability(mobile).subscribe((isAvailable) => {
      if (!isAvailable) {
        this.employeeForm?.get('mobile')?.setErrors({ mobile: true });
        this.toastr.error('Mobile is already used. Try Another mobile');
      }
    });
  }

  onDocumentTypeChange() {
    const documentType = this.employeeForm.value.documentType;
    const fileInput = document.getElementById('file') as HTMLInputElement;
    switch (documentType) {
      case 'png':
        fileInput.accept = 'image/png';
        break;
      case 'pdf':
        fileInput.accept = 'application/pdf';
        break;
      case 'docs':
        fileInput.accept = '.doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt';
        break;
      default:
        fileInput.accept = '';
    }
  }
}
