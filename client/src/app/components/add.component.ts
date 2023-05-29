import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from '../service/cards.service';
import { AlertService } from '@full-fledged/alerts';
import { User } from '../models/user';
import { UsersharingService } from '../service/usersharing.service';
import { UserCard } from '../models/card';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{

  form!: FormGroup
  user!: User|null;
  selectedImage: File | null = null;

  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private router: Router,
    private cSvc: CardsService,private alertSVc: AlertService,
    private uShare: UsersharingService){}

    ngOnInit(): void {
      this.form=this.createForm();
      this.user = this.uShare.getUser();
      console.log("Initial user:",this.user)
    }

    private createForm(): FormGroup{
      return this.fb.group({
        cardname: this.fb.control<string>('',[Validators.required]),
        type: this.fb.control<string>('',[Validators.required]),
        cardcondition: this.fb.control<string>('',[Validators.required]),
        defect: this.fb.control<string>('',[Validators.required,Validators.maxLength(120)]),
        price: this.fb.control<string>('',[Validators.required]),
        //image: [null, [this.validateImage.bind(this)]]
        image: this.fb.control(null, [Validators.required])
      })
    }

    onImageSelected(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const selectedFile = inputElement.files[0];
        const fileName = selectedFile.name;
        const fileExtension = this.getFileExtension(fileName);
        if (this.isValidImageExtension(fileExtension)) {
          this.selectedImage = selectedFile;
          this.form.patchValue({ image: fileName });
          this.form.get('image')?.markAsTouched();
        } else {
          // Invalid file extension, clear the selection
          this.selectedImage = null;
          this.form.patchValue({ image: null });
          // Display an error message or perform other error handling as needed
        }
      } else {
        this.selectedImage = null;
        this.form.patchValue({ image: null });
      }
    }

    private getFileExtension(filename: string): string {
      if (filename && filename.length > 0) {
        const dotIndex = filename.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < filename.length - 1) {
          return filename.substring(dotIndex + 1).toLowerCase();
        }
      }
      return '';
    }

    private isValidImageExtension(extension: string): boolean {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      return allowedExtensions.includes(extension);
    }

    addToCollection(){
      const userCard = this.form.value as UserCard
      if(this.user){
        userCard.email= this.user.email;
        userCard.displayname = this.user.displayname;
        userCard.available="yes";
      }
      // Convert the selected file to a Blob
      const selectedFile = this.selectedImage;
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          userCard.image = Array.from(uint8Array); // Convert to byte[] array

          // Proceed with adding the user card
          this.addUserCard(userCard);
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        // No file selected, proceed with adding the user card without the image
        this.addUserCard(userCard);
      }
    }

    addUserCard(userCard: UserCard) {
      console.log("Value after adding user: ", userCard);
      this.cSvc.addToCollection(userCard)
        .then((added: boolean) => {
          console.log(added);
          if (added) {
            console.log("Successfully added!");
            this.alertSVc.success("Card Added Successfully!");
            this.form.reset();
            this.router.navigate(['/api/addcard']);
          }
        })
        .catch((error) => {
          console.log("Failed to add card!");
          this.alertSVc.danger("Card not added!");
          console.error('Error adding card:', error);
        });
    }

}
