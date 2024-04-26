import { Component } from '@angular/core';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent {
  courses: any[] = [
    {
      courseName: 'Java FullStack',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1000',
      duration: '3 months',
      
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'path/to/course1/image.png',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'path/to/course1/image.png',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Java FullStack',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'path/to/course1/image.png',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'path/to/course1/image.png',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Java FullStack',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'path/to/course1/image.png',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'path/to/course1/image.png',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
    {
      courseName: 'Course 1',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1000',
      duration: '3 months'
    },
    {
      courseName: 'Course 2',
      image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?size=626&ext=jpg&ga=GA1.1.2073339980.1711005758&semt=sph ',
      fees: '1500',
      duration: '6 months'
    },
  ];
  
  toggleNotificationPanel(): void {
    const sidebar = document.querySelector('.offcanvas') as HTMLElement;
    sidebar.classList.toggle('show');
  }

  hidetoggleNotificationPanel(): void {
    const sidebar = document.querySelector('.offcanvas') as HTMLElement;
    sidebar.classList.remove('show');
  }

}
